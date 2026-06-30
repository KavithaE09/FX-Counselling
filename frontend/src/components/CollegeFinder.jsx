import React, { useState } from 'react';

const FX_DATA = {
  college: {
    name: "Francis Xavier Engineering College",
    code: "4955",
    district: "Tirunelveli",
    type: "Private Self-Financing",
    website: "www.fxec.in",
  },
  years: [2025, 2024, 2023],
  communities: ["OC", "BC", "BCM", "MBC", "SC", "SCA", "ST"],
  branches: [
    {
      name: "Computer Science and Engineering",
      code: "CS",
      cutoffs: {
        2025: { OC: 172, BC: 158, BCM: 148, MBC: 148, SC: 138, SCA: 128, ST: 122 },
        2024: { OC: 168.5, BC: 155.5, BCM: 145, MBC: 145, SC: 135, SCA: 125, ST: 120 },
        2023: { OC: 165, BC: 150, BCM: 140, MBC: 140, SC: 130, SCA: 120, ST: 115 },
      },
    },
    {
      name: "Mechanical Engineering",
      code: "ME",
      cutoffs: {
        2025: { OC: 144, BC: 132, BCM: 122, MBC: 122, SC: 112, SCA: 104, ST: 99 },
        2024: { OC: 140, BC: 128, BCM: 118, MBC: 118, SC: 108, SCA: 100, ST: 95 },
        2023: { OC: 138, BC: 126, BCM: 116, MBC: 116, SC: 106, SCA: 98, ST: 93 },
      },
    },
    {
      name: "Electronics and Communication Engg",
      code: "EC",
      cutoffs: {
        2025: { OC: 158, BC: 145, BCM: 133, MBC: 133, SC: 123, SCA: 113, ST: 108 },
        2024: { OC: 155, BC: 142, BCM: 130, MBC: 130, SC: 120, SCA: 110, ST: 105 },
        2023: { OC: 152, BC: 140, BCM: 128, MBC: 128, SC: 118, SCA: 108, ST: 103 },
      },
    },
    {
      name: "Civil Engineering",
      code: "CE",
      cutoffs: {
        2025: { OC: 133, BC: 121, BCM: 111, MBC: 111, SC: 101, SCA: 93, ST: 88 },
        2024: { OC: 130, BC: 118, BCM: 108, MBC: 108, SC: 98, SCA: 90, ST: 85 },
        2023: { OC: 128, BC: 115, BCM: 105, MBC: 105, SC: 95, SCA: 88, ST: 83 },
      },
    },
    {
      name: "Electrical and Electronics Engg",
      code: "EE",
      cutoffs: {
        2025: { OC: 141, BC: 128, BCM: 118, MBC: 118, SC: 108, SCA: 100, ST: 95 },
        2024: { OC: 138, BC: 125, BCM: 115, MBC: 115, SC: 105, SCA: 97, ST: 92 },
        2023: { OC: 136, BC: 123, BCM: 113, MBC: 113, SC: 103, SCA: 95, ST: 90 },
      },
    },
    {
      name: "Information Technology",
      code: "IT",
      cutoffs: {
        2025: { OC: 165, BC: 153, BCM: 143, MBC: 143, SC: 133, SCA: 123, ST: 118 },
        2024: { OC: 162, BC: 150, BCM: 140, MBC: 140, SC: 130, SCA: 120, ST: 115 },
        2023: { OC: 160, BC: 148, BCM: 138, MBC: 138, SC: 128, SCA: 118, ST: 113 },
      },
    },
  ],
};

const COMMUNITY_COLORS = {
  OC: '#1a56db',
  BC: '#0e9f6e',
  BCM: '#7e3af2',
  MBC: '#ff5a1f',
  SC: '#e02424',
  SCA: '#8e4b10',
  ST: '#057a55',
};

export default function CollegeFinder({ user, onLogout }) {
  const [selectedYear, setSelectedYear] = useState(2025);

  const userCommunity = user.caste;
  const userCutoff = parseFloat(user.com);

  // Determine eligibility per branch
  const getEligibility = (branch) => {
    const required = branch.cutoffs[selectedYear][userCommunity];
    if (required == null) return null;
    if (userCutoff >= required) return 'eligible';
    if (userCutoff >= required - 10) return 'borderline';
    return 'not-eligible';
  };

  return (
    <div className="fx-layout">

      {/* ===== COLLEGE BANNER ===== */}
      <div className="fx-college-banner">
        <div className="fx-college-logo-container">
          <div className="fx-college-logo-bg">
            <img
              src="https://francisxavier.ac.in/cs-content/themes/fxec//images/logo-admission.png"
              alt="Francis Xavier Engineering College Logo"
              className="fx-dashboard-logo"
            />
          </div>
          <div className="fx-college-banner-info">
            <div className="fx-accreditation-details">
              <span className="fx-badge-autonomous">AN AUTONOMOUS INSTITUTION</span>
              <span className="fx-accred-text">Accredited by NBA (CSE, ECE, EEE, MECH)</span>
              <span className="fx-accred-text">AICTE Sponsored Margdarshan Mentor Institution | ISO 9001:2015 Certified</span>
            </div>
            <div className="fx-college-meta">
              <span>📍 {FX_DATA.college.district}</span>
              <span>🏫 Code: {FX_DATA.college.code}</span>
              <span>🔖 {FX_DATA.college.type}</span>
            </div>
          </div>
        </div>
        <div className="fx-banner-right">
          <div className="fx-banner-user">
            <div className="fx-banner-row">
              <span className="fx-banner-label">Name</span>
              <span className="fx-banner-value">{user.name}</span>
            </div>
            <div className="fx-banner-row">
              <span className="fx-banner-label">Your Cutoff</span>
              <span className="fx-banner-value fx-banner-highlight">{user.com}</span>
            </div>
            <div className="fx-banner-row">
              <span className="fx-banner-label">Community</span>
              <span className="fx-banner-value">
                <span className="fx-comm-pill" style={{ background: COMMUNITY_COLORS[userCommunity] }}>
                  {userCommunity}
                </span>
              </span>
            </div>
          </div>
          <button className="fx-btn-logout fx-btn-logout-banner" onClick={onLogout}> LOGOUT</button>
        </div>
      </div>

      {/* ===== CONTROLS ===== */}
      <div className="fx-controls">
        <div className="fx-year-tabs">
          {FX_DATA.years.map(y => (
            <button
              key={y}
              className={`fx-year-btn ${selectedYear === y ? 'active' : ''}`}
              onClick={() => setSelectedYear(y)}
            >
              TNEA {y}
            </button>
          ))}
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="fx-table-wrapper">
        <table className="fx-table">
          <thead>
            <tr>
              <th className="fx-th-branch">Branch</th>
              <th>Code</th>
              {FX_DATA.communities.map(c => (
                <th
                  key={c}
                  className={c === userCommunity ? 'fx-th-highlight' : ''}
                  style={c === userCommunity ? { background: COMMUNITY_COLORS[c], color: '#fff' } : {}}
                >
                  {c}
                  {c === userCommunity ? ' ★' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FX_DATA.branches.map(branch => {
              const elig = getEligibility(branch);
              return (
                <tr key={branch.code} className={`fx-row fx-row-${elig}`}>
                  <td className="fx-td-branch">
                    <div className="fx-branch-name">{branch.name}</div>
                    {elig === 'eligible' && (
                      <span className="fx-elig-pill eligible">✅ Eligible for you</span>
                    )}
                    {elig === 'borderline' && (
                      <span className="fx-elig-pill borderline">⚠️ Borderline</span>
                    )}
                  </td>
                  <td className="fx-td-code">{branch.code}</td>
                  {FX_DATA.communities.map(c => {
                    const val = branch.cutoffs[selectedYear][c];
                    const isUser = c === userCommunity;
                    const isEligible = isUser && userCutoff >= val;

                    return (
                      <td
                        key={c}
                        className={`fx-td-val ${isUser ? 'fx-user-col' : ''} ${isEligible ? 'fx-eligible-cell' : ''}`}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== USER SUMMARY ===== */}
      <div className="fx-summary-bar">
        <div className="fx-summary-card">
          <span className="fx-summ-label">Your Cutoff</span>
          <span className="fx-summ-val">{user.com}</span>
        </div>
        <div className="fx-summary-card">
          <span className="fx-summ-label">Community</span>
          <span className="fx-summ-val" style={{ color: COMMUNITY_COLORS[userCommunity] }}>{userCommunity}</span>
        </div>
        <div className="fx-summary-card">
          <span className="fx-summ-label">Eligible Branches</span>
          <span className="fx-summ-val">
            {FX_DATA.branches.filter(b => {
              const req = b.cutoffs[selectedYear][userCommunity];
              return userCutoff >= req;
            }).length} / {FX_DATA.branches.length}
          </span>
        </div>
        <div className="fx-summary-card">
          <span className="fx-summ-label">Viewing Year</span>
          <span className="fx-summ-val">TNEA {selectedYear}</span>
        </div>
      </div>
    </div>
  );
}
