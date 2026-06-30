import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.resolve('db.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Simple in-memory store for OTPs (mobile_number -> otp_code)
const otpStore = {};

// Helper to read database
async function readDb() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB file, initializing empty structure:', error);
    return { users: [], colleges: [] };
  }
}

// Helper to write database
async function writeDb(data) {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing DB file:', error);
  }
}

// 1. Check if mobile number is registered
app.post('/api/checkmem', async (req, res) => {
  const { num } = req.body;
  if (!num) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }
  
  const db = await readDb();
  const userExists = db.users.some(user => user.mob === num);
  
  console.log(`[Check Member] Mobile: ${num} -> Exists: ${userExists}`);
  // Returning plain boolean or a status
  return res.json(userExists);
});

// 2. Generate and Send OTP
app.post('/api/otp', (req, res) => {
  const { num } = req.body;
  if (!num || num.length !== 10) {
    return res.status(400).json({ error: 'Valid 10-digit mobile number is required' });
  }

  // Generate 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[num] = otp;

  console.log(`\n======================================`);
  console.log(`[OTP SENT] To: ${num}`);
  console.log(`[OTP CODE] => ${otp} <=`);
  console.log(`======================================\n`);

  // We return the OTP in the response for easy local testing,
  // but in production it would only be sent via SMS.
  return res.json({ success: true, message: 'OTP Sent successfully', otp });
});

// 3. Verify OTP
app.post('/api/verify', (req, res) => {
  const { verify, num } = req.body;
  
  // If num is not passed explicitly, we search the otpStore for the matching code.
  // This helps match the jQuery client which only sends {verify: otp}.
  let matchedNum = num;
  if (!matchedNum) {
    matchedNum = Object.keys(otpStore).find(key => otpStore[key] === verify);
  }

  if (!matchedNum || otpStore[matchedNum] !== verify) {
    console.log(`[OTP VERIFY] Failed for verification code: ${verify}`);
    return res.json(0); // Return 0 as invalid according to the original code
  }

  // OTP verified, remove it from the store
  delete otpStore[matchedNum];
  console.log(`[OTP VERIFY] Success for Mobile: ${matchedNum}`);
  return res.json(1); // Return 1 as success
});

// 4. Register new member
app.post('/api/reg', async (req, res) => {
  const {
    name,
    mob,
    caste,
    email,
    dist,
    board,
    schlor,
    phy,
    chem,
    math,
    com,
    rank
  } = req.body;

  if (!name || !mob || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const db = await readDb();
  
  // Check if already registered
  const existingUserIndex = db.users.findIndex(u => u.mob === mob);
  const newUser = {
    name,
    mob,
    caste,
    email,
    dist,
    board,
    schlor,
    phy: parseFloat(phy) || 0,
    chem: parseFloat(chem) || 0,
    math: parseFloat(math) || 0,
    com: parseFloat(com) || ((parseFloat(phy)/2) + (parseFloat(chem)/2) + parseFloat(math)).toFixed(2),
    rank: rank || "Not Assigned",
    registeredAt: new Date().toISOString()
  };

  if (existingUserIndex >= 0) {
    db.users[existingUserIndex] = newUser;
  } else {
    db.users.push(newUser);
  }

  await writeDb(db);
  console.log(`[Registration] Success for User: ${name} (${mob})`);
  return res.json({ success: true, user: newUser });
});

// 5. Get colleges list & filter based on user criteria
app.get('/api/colleges', async (req, res) => {
  const { cutoff, caste, district } = req.query;
  const db = await readDb();
  
  let filteredColleges = db.colleges.map(college => {
    // Filter courses matching the user's cutoff for their caste
    const matchingCourses = college.courses.filter(course => {
      const targetCutoff = course.cutoffs[caste] || course.cutoffs['OC']; // Fallback to OC if caste cutoff is not defined
      return parseFloat(cutoff) >= parseFloat(targetCutoff);
    }).map(course => ({
      name: course.name,
      requiredCutoff: course.cutoffs[caste] || course.cutoffs['OC']
    }));

    return {
      id: college.id,
      name: college.name,
      code: college.code,
      district: college.district,
      courses: matchingCourses
    };
  }).filter(college => college.courses.length > 0); // Only return colleges with at least one matching course

  if (district && district !== 'District') {
    // We filter by district if matching name is found
    filteredColleges = filteredColleges.filter(c => c.district.toLowerCase() === district.toLowerCase());
  }

  return res.json(filteredColleges);
});

// 6. Get single user details by mobile
app.get('/api/user/:mob', async (req, res) => {
  const { mob } = req.params;
  const db = await readDb();
  const user = db.users.find(u => u.mob === mob);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json(user);
});

// 7. Get list of districts
app.get('/api/districts', (req, res) => {
  const districts = [
    { id: "1", name: "Ariyalur" },
    { id: "2", name: "Chengalpattu" },
    { id: "3", name: "Chennai" },
    { id: "4", name: "Coimbatore" },
    { id: "5", name: "Cuddalore" },
    { id: "6", name: "Dharmapuri" },
    { id: "7", name: "Dindigul" },
    { id: "8", name: "Erode" },
    { id: "9", name: "Kallakurichi" },
    { id: "10", name: "Kancheepuram" },
    { id: "11", name: "Karur" },
    { id: "12", name: "Krishnagiri" },
    { id: "13", name: "Madurai" },
    { id: "14", name: "Mayiladuthurai" },
    { id: "15", name: "Nagapattinam" },
    { id: "16", name: "Nagercoil" },
    { id: "17", name: "Namakkal" },
    { id: "18", name: "Perambalur" },
    { id: "19", name: "Pudukkottai" },
    { id: "20", name: "Ramanathapuram" },
    { id: "21", name: "Ranipet" },
    { id: "22", name: "Salem" },
    { id: "23", name: "Sivagangai" },
    { id: "24", name: "Tenkasi" },
    { id: "25", name: "Thanjavur" },
    { id: "26", name: "Theni" },
    { id: "27", name: "Thiruvallur" },
    { id: "28", name: "Thiruvarur" },
    { id: "29", name: "Thoothukudi" },
    { id: "30", name: "Tiruchirappalli" },
    { id: "31", name: "Tirunelveli" },
    { id: "32", name: "Tirupathur" },
    { id: "33", name: "Tiruppur" },
    { id: "34", name: "Tiruvannamalai" },
    { id: "35", name: "Nilgiris" },
    { id: "36", name: "Vellore" },
    { id: "37", name: "Viluppuram" },
    { id: "38", name: "Virudhunagar" }
  ];
  return res.json(districts);
});

app.listen(PORT, () => {
  console.log(`TNEA Backend running on http://localhost:${PORT}`);
});
