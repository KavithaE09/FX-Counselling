import React, { useState, useRef, useEffect } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

// Districts will be fetched from API

export default function AuthCard({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [generalSuccess, setGeneralSuccess] = useState('');

  // ---------------- LOGIN STATE ----------------
  const [loginMobile, setLoginMobile] = useState('');
  const [loginErrors, setLoginErrors] = useState({});

  // ---------------- REGISTER STATE ----------------
  const [regForm, setRegForm] = useState({
    name: '',
    mob: '',
    caste: '',
    email: '',
    dist: '',
    board: '',
    schlor: 'general',
    phy: '',
    chem: '',
    math: '',
    com: '0.00',
    rank: ''
  });
  const [regErrors, setRegErrors] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [districts, setDistricts] = useState([]);
  const [testOtpHelper, setTestOtpHelper] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/districts`)
      .then(res => res.json())
      .then(data => setDistricts(data))
      .catch(err => console.error("Failed to fetch districts:", err));
  }, []);

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const p = parseFloat(regForm.phy) || 0;
    const c = parseFloat(regForm.chem) || 0;
    const m = parseFloat(regForm.math) || 0;
    const computed = ((p / 2) + (c / 2) + m).toFixed(2);
    setRegForm(prev => ({ ...prev, com: computed }));
  }, [regForm.phy, regForm.chem, regForm.math]);

  const handleRegMobileBlur = async () => {
    const num = regForm.mob.trim();
    if (num.length !== 10 || isNaN(num)) return;

    try {
      const response = await fetch(`${API_URL}/checkmem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num })
      });
      const exists = await response.json();
      if (exists) {
        setIsAlreadyRegistered(true);
      } else {
        setIsAlreadyRegistered(false);
      }
      setRegErrors(prev => {
        const clone = { ...prev };
        delete clone.mob;
        return clone;
      });
    } catch (err) {
      console.error('Error checking membership:', err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setGeneralSuccess('');
    
    if (loginMobile.trim().length !== 10 || isNaN(loginMobile)) {
      setLoginErrors({ mob: 'Enter a valid 10-digit mobile number' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/checkmem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num: loginMobile })
      });
      const exists = await response.json();
      
      if (!exists) {
        setGeneralError('Invalid Mobile Number. You are not registered.');
      } else {
        const userRes = await fetch(`${API_URL}/user/${loginMobile}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          onLoginSuccess(userData);
        } else {
          setGeneralError('Failed to fetch user details');
        }
      }
    } catch (err) {
      setGeneralError('Network error. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateRegForm = () => {
    const errors = {};
    if (!regForm.name || regForm.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(regForm.name)) {
      errors.name = 'Only letters allowed';
    }

    if (!regForm.caste) {
      errors.caste = 'Select community';
    }

    const validateMark = (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    };

    if (regForm.phy === '' || !validateMark(regForm.phy)) {
      errors.phy = 'Enter Physics mark (0-100)';
    }
    if (regForm.chem === '' || !validateMark(regForm.chem)) {
      errors.chem = 'Enter Chemistry mark (0-100)';
    }
    if (regForm.math === '' || !validateMark(regForm.math)) {
      errors.math = 'Enter Maths mark (0-100)';
    }

    if (!regForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) {
      errors.email = 'Enter valid email';
    }

    if (!regForm.dist) {
      errors.dist = 'Select district';
    }

    if (!regForm.board) {
      errors.board = 'Select Board';
    }

    if (regForm.mob.trim().length !== 10 || isNaN(regForm.mob)) {
      errors.mob = 'Enter valid 10-digit mobile number';
    }

    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setGeneralSuccess('');
    
    if (!validateRegForm()) return;

    setLoading(true);
    try {
      const regRes = await fetch(`${API_URL}/reg`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm)
      });
      const regData = await regRes.json();

      if (regData.success) {
        setGeneralSuccess('Registration Successful!');
        setTimeout(() => {
          onLoginSuccess(regData.user);
        }, 1000);
      } else {
        setGeneralError(regData.error || 'Registration failed');
      }
    } catch (err) {
      setGeneralError('Network error. Make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="fx-logo-wrap">
        <img 
          src="https://francisxavier.ac.in/cs-content/themes/fxec/images/logo.png" 
          alt="Francis Xavier Engineering College" 
          className="fx-college-logo" 
        />
      </div>
      
      <h2>FX 2026 - FIND YOUR COLLEGE</h2>

      <div className="tabs">
        <button 
          id="loginTab" 
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => {
            setActiveTab('login');
            setGeneralError('');
            setGeneralSuccess('');
          }}
        >
          Login
        </button>
        <button 
          id="registerTab"
          className={activeTab === 'register' ? 'active' : ''}
          onClick={() => {
            setActiveTab('register');
            setGeneralError('');
            setGeneralSuccess('');
          }}
        >
          Register
        </button>
      </div>

      <div className="form-group">
        {generalError && (
          <div className="alert alert-danger" id="inval">
            {generalError}
          </div>
        )}
        {generalSuccess && (
          <div className="alert alert-success" id="sentSuccess">
            {generalSuccess}
          </div>
        )}
        {testOtpHelper && otpSent && (
          <div className="alert alert-success" style={{ padding: '8px', fontSize: '14px', marginTop: '10px' }}>
            <strong>[Test] OTP:</strong> {testOtpHelper}
          </div>
        )}
      </div>

      {activeTab === 'login' && (
        <form id="loginForm" onSubmit={handleLoginSubmit}>
          <p style={{ textAlign: 'center', marginBottom: '5px' }}>Enter mobile number</p>
          <div className="input-box">
            <span>+91</span>
            <input 
              type="text" 
              id="login_mob_number" 
              name="login_mob_number"
              maxLength="10"
              value={loginMobile}
              onChange={(e) => {
                setLoginMobile(e.target.value.replace(/\D/g, ''));
                setLoginErrors({});
              }}
            />
          </div>
          {loginErrors.mob && <span className="field-error">{loginErrors.mob}</span>}
          <button type="submit" className="otp-btn" id="login_send" disabled={loading}>
            {loading ? 'Wait...' : 'Submit'}
          </button>
        </form>
      )}

      {activeTab === 'register' && (
        <form id="registerForm" onSubmit={(e) => e.preventDefault()}>
          <div style={{ textAlign: 'left' }}>
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Name *" 
              value={regForm.name}
              onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
            />
            {regErrors.name && <span className="field-error">{regErrors.name}</span>}

            <select 
              name="caste" 
              id="caste"
              value={regForm.caste}
              onChange={(e) => setRegForm({ ...regForm, caste: e.target.value })}
            >
              <option value="" disabled>Community</option>
              <option value="OC">OC</option>
              <option value="BC">BC</option>
              <option value="BCM">BCM</option>
              <option value="MBC">MBC</option>
              <option value="SC">SC</option>
              <option value="SCA">SCA</option>
              <option value="ST">ST</option>
            </select>
            {regErrors.caste && <span className="field-error">{regErrors.caste}</span>}

            <input 
              type="number" 
              id="phy" 
              name="phy" 
              placeholder="Enter Your Physics mark" 
              min="0"
              max="100"
              value={regForm.phy}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= 100)) {
                  setRegForm({ ...regForm, phy: val });
                  setRegErrors(prev => { const c = {...prev}; delete c.phy; return c; });
                } else {
                  setRegErrors(prev => ({ ...prev, phy: 'Physics mark must be between 0 and 100' }));
                }
              }}
            />
            {regErrors.phy && <span className="field-error">{regErrors.phy}</span>}

            <input 
              type="number" 
              name="chem" 
              id="chem" 
              placeholder="Enter Your Chemistry mark"
              min="0"
              max="100"
              value={regForm.chem}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= 100)) {
                  setRegForm({ ...regForm, chem: val });
                  setRegErrors(prev => { const c = {...prev}; delete c.chem; return c; });
                } else {
                  setRegErrors(prev => ({ ...prev, chem: 'Chemistry mark must be between 0 and 100' }));
                }
              }}
            />
            {regErrors.chem && <span className="field-error">{regErrors.chem}</span>}

            <input 
              type="number" 
              id="math" 
              name="math" 
              placeholder="Enter Your Mathematics mark"
              min="0"
              max="100"
              value={regForm.math}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= 100)) {
                  setRegForm({ ...regForm, math: val });
                  setRegErrors(prev => { const c = {...prev}; delete c.math; return c; });
                } else {
                  setRegErrors(prev => ({ ...prev, math: 'Mathematics mark must be between 0 and 100' }));
                }
              }}
            />
            {regErrors.math && <span className="field-error">{regErrors.math}</span>}

            <input 
              type="text" 
              id="com" 
              name="com" 
              placeholder="Cutoff" 
              readOnly
              value={regForm.com}
            />

            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Your Email *"
              value={regForm.email}
              onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
            />
            {regErrors.email && <span className="field-error">{regErrors.email}</span>}

            <select 
              name="dist" 
              id="dist"
              value={regForm.dist}
              onChange={(e) => setRegForm({ ...regForm, dist: e.target.value })}
            >
              <option value="" disabled>District</option>
              {districts.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            {regErrors.dist && <span className="field-error">{regErrors.dist}</span>}

            <select 
              name="board" 
              id="board"
              value={regForm.board}
              onChange={(e) => setRegForm({ ...regForm, board: e.target.value })}
            >
              <option value="" disabled>Board</option>
              <option value="STATE BOARD-MATRIC">STATE BOARD - MATRIC</option>
              <option value="STATE BOARD-Goverment AIDED">STATE BOARD - GOVERMENT AIDED</option>
              <option value="STATE BOARD-GOVERMENT">STATE BOARD - GOVERMENT </option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="OTHERS">OTHERS</option>
            </select>
            {regErrors.board && <span className="field-error">{regErrors.board}</span>}

            <select 
              name="Schlor" 
              id="Schlor"
              value={regForm.schlor}
              onChange={(e) => setRegForm({ ...regForm, schlor: e.target.value })}
            >
              <option value="general">General (92.5%)</option>
              <option value="govt">Government (7.5%)</option>
            </select>

            <input 
              type="text" 
              id="number" 
              name="mob" 
              placeholder="Enter Mobile Number"
              maxLength="10"
              value={regForm.mob}
              onChange={(e) => setRegForm({ ...regForm, mob: e.target.value.replace(/\D/g, '') })}
              onBlur={handleRegMobileBlur}
            />
            {regErrors.mob && <span className="field-error">{regErrors.mob}</span>}
            
            {isAlreadyRegistered && (
              <div className="alert alert-success" id="inval" style={{ marginTop: '10px', background: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }}>
                This mobile number is already registered. Submitting will update your cutoff profile details.
              </div>
            )}
          </div>

          <button 
            className="otp-btn" 
            id="register_submit" 
            onClick={handleRegisterSubmit} 
            disabled={loading}
          >
            {loading ? 'Submitting...' : isAlreadyRegistered ? 'Update & Login' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
}
