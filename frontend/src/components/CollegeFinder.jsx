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
        2025: {
          OC: { max: 192.0, min: 176.0 },
          BC: { max: 190.5, min: 159.5 },
          BCM: { max: 185.0, min: 169.0 },
          MBC: { max: 184.5, min: 144.0 },
          SC: { max: 178.0, min: 94.5 },
          SCA: { max: 155.0, min: 128.0 },
          ST: { max: 150.0, min: 122.0 }
        },
        2024: {
          OC: { max: 188.5, min: 172.5 },
          BC: { max: 186.5, min: 156.0 },
          BCM: { max: 181.5, min: 165.0 },
          MBC: { max: 181.0, min: 140.5 },
          SC: { max: 174.0, min: 91.0 },
          SCA: { max: 151.0, min: 125.0 },
          ST: { max: 146.0, min: 120.0 }
        },
        2023: {
          OC: { max: 185.0, min: 169.0 },
          BC: { max: 183.0, min: 152.5 },
          BCM: { max: 178.0, min: 161.5 },
          MBC: { max: 177.5, min: 137.0 },
          SC: { max: 170.5, min: 87.5 },
          SCA: { max: 147.5, min: 121.5 },
          ST: { max: 142.5, min: 116.5 }
        }
      },
      ranks: {
        2025: { OC: 51306, BC: 91471, BCM: 64600, MBC: 136093, SC: 230621, SCA: 104099, ST: 232595 },
        2024: { OC: 48200, BC: 87000, BCM: 61000, MBC: 130000, SC: 218000, SCA: 99000, ST: 220000 },
        2023: { OC: 45000, BC: 83000, BCM: 58000, MBC: 124000, SC: 205000, SCA: 94000, ST: 208000 }
      }
    },
    {
      name: "Electronics and Communication Engg",
      code: "EC",
      cutoffs: {
        2025: {
          OC: { max: 195.5, min: 166.5 },
          BC: { max: 186.0, min: 148.0 },
          BCM: { max: 179.0, min: 161.5 },
          MBC: { max: 179.5, min: 137.5 },
          SC: { max: 166.0, min: 120.0 },
          SCA: { max: 145.0, min: 113.0 },
          ST: { max: 140.0, min: 108.0 }
        },
        2024: {
          OC: { max: 192.0, min: 163.5 },
          BC: { max: 182.5, min: 145.0 },
          BCM: { max: 175.5, min: 158.5 },
          MBC: { max: 176.0, min: 134.5 },
          SC: { max: 162.5, min: 117.0 },
          SCA: { max: 142.0, min: 110.0 },
          ST: { max: 137.0, min: 105.0 }
        },
        2023: {
          OC: { max: 189.0, min: 160.5 },
          BC: { max: 179.5, min: 142.0 },
          BCM: { max: 172.5, min: 155.5 },
          MBC: { max: 173.0, min: 131.5 },
          SC: { max: 159.5, min: 114.0 },
          SCA: { max: 139.0, min: 107.0 },
          ST: { max: 134.0, min: 102.0 }
        }
      },
      ranks: {
        2025: { OC: 78696, BC: 125390, BCM: 86384, MBC: 156266, SC: 177733, SCA: 121293, ST: null },
        2024: { OC: 74000, BC: 119000, BCM: 81000, MBC: 148000, SC: 168000, SCA: 115000, ST: null },
        2023: { OC: 70000, BC: 113000, BCM: 77000, MBC: 141000, SC: 159000, SCA: 109000, ST: null }
      }
    },
    {
      name: "Electrical and Electronics Engg",
      code: "EE",
      cutoffs: {
        2025: {
          OC: { max: 168.0, min: 162.5 },
          BC: { max: 159.5, min: 141.0 },
          BCM: { max: 161.0, min: 154.5 },
          MBC: { max: 165.5, min: 133.5 },
          SC: { max: 156.5, min: 102.5 },
          SCA: { max: 135.0, min: 100.0 },
          ST: { max: 130.0, min: 95.0 }
        },
        2024: {
          OC: { max: 165.0, min: 159.5 },
          BC: { max: 156.5, min: 138.0 },
          BCM: { max: 158.0, min: 151.5 },
          MBC: { max: 162.5, min: 130.5 },
          SC: { max: 153.5, min: 99.5 },
          SCA: { max: 132.0, min: 97.0 },
          ST: { max: 127.0, min: 92.0 }
        },
        2023: {
          OC: { max: 162.0, min: 156.5 },
          BC: { max: 153.5, min: 135.0 },
          BCM: { max: 155.0, min: 148.5 },
          MBC: { max: 159.5, min: 127.5 },
          SC: { max: 150.5, min: 96.5 },
          SCA: { max: 129.0, min: 94.0 },
          ST: { max: 124.0, min: 89.0 }
        }
      },
      ranks: {
        2025: { OC: 101026, BC: 143404, BCM: 106409, MBC: 163437, SC: 226915, SCA: null, ST: null },
        2024: { OC: 96000, BC: 136000, BCM: 101000, MBC: 155000, SC: 215000, SCA: null, ST: null },
        2023: { OC: 91000, BC: 129000, BCM: 96000, MBC: 148000, SC: 204000, SCA: null, ST: null }
      }
    },
    {
      name: "Information Technology",
      code: "IT",
      cutoffs: {
        2025: {
          OC: { max: 175.0, min: 162.5 },
          BC: { max: 175.0, min: 153.0 },
          BCM: { max: 174.0, min: 159.0 },
          MBC: { max: 163.0, min: 142.0 },
          SC: { max: 159.5, min: 112.0 },
          SCA: { max: 150.0, min: 123.0 },
          ST: { max: 145.0, min: 118.0 }
        },
        2024: {
          OC: { max: 172.0, min: 159.5 },
          BC: { max: 172.0, min: 150.0 },
          BCM: { max: 171.0, min: 156.0 },
          MBC: { max: 160.0, min: 139.0 },
          SC: { max: 156.5, min: 109.0 },
          SCA: { max: 147.0, min: 120.0 },
          ST: { max: 142.0, min: 115.0 }
        },
        2023: {
          OC: { max: 169.0, min: 156.5 },
          BC: { max: 169.0, min: 147.0 },
          BCM: { max: 168.0, min: 153.0 },
          MBC: { max: 157.0, min: 136.0 },
          SC: { max: 153.5, min: 106.0 },
          SCA: { max: 144.0, min: 117.0 },
          ST: { max: 139.0, min: 112.0 }
        }
      },
      ranks: {
        2025: { OC: 84624, BC: 109694, BCM: 93765, MBC: 144239, SC: 212329, SCA: null, ST: null },
        2024: { OC: 80000, BC: 104000, BCM: 88000, MBC: 137000, SC: 201000, SCA: null, ST: null },
        2023: { OC: 76000, BC: 99000, BCM: 84000, MBC: 130000, SC: 191000, SCA: null, ST: null }
      }
    },
    {
      name: "Mechanical Engineering",
      code: "ME",
      cutoffs: {
        2025: {
          OC: { max: 155.5, min: 144.0 },
          BC: { max: 155.5, min: 126.0 },
          BCM: { max: 155.5, min: 148.0 },
          MBC: { max: 150.5, min: 125.5 },
          SC: { max: 127.5, min: 116.0 },
          SCA: { max: 125.0, min: 104.0 },
          ST: { max: 120.0, min: 99.0 }
        },
        2024: {
          OC: { max: 151.5, min: 140.0 },
          BC: { max: 151.5, min: 122.0 },
          BCM: { max: 151.5, min: 144.0 },
          MBC: { max: 146.5, min: 121.5 },
          SC: { max: 123.5, min: 112.0 },
          SCA: { max: 121.0, min: 100.0 },
          ST: { max: 116.0, min: 95.0 }
        },
        2023: {
          OC: { max: 149.5, min: 138.0 },
          BC: { max: 149.5, min: 120.0 },
          BCM: { max: 149.5, min: 142.0 },
          MBC: { max: 144.5, min: 119.5 },
          SC: { max: 121.5, min: 110.0 },
          SCA: { max: 119.0, min: 98.0 },
          ST: { max: 114.0, min: 93.0 }
        }
      },
      ranks: {
        2025: { OC: 121235, BC: 207789, BCM: 124643, MBC: 183271, SC: 204453, SCA: null, ST: null },
        2024: { OC: 115000, BC: 198000, BCM: 118000, MBC: 175000, SC: 195000, SCA: null, ST: null },
        2023: { OC: 109000, BC: 188000, BCM: 112000, MBC: 167000, SC: 186000, SCA: null, ST: null }
      }
    },
    {
      name: "Artificial Intelligence and Data Science",
      code: "AD",
      cutoffs: {
        2025: {
          OC: { max: 184.0, min: 163.5 },
          BC: { max: 181.0, min: 149.0 },
          BCM: { max: 181.0, min: 158.0 },
          MBC: { max: 170.5, min: 139.5 },
          SC: { max: 172.0, min: 101.5 },
          SCA: { max: 152.0, min: 126.0 },
          ST: { max: 148.0, min: 120.0 }
        },
        2024: {
          OC: { max: 180.0, min: 159.5 },
          BC: { max: 177.0, min: 145.0 },
          BCM: { max: 177.0, min: 154.0 },
          MBC: { max: 166.5, min: 135.5 },
          SC: { max: 168.0, min: 97.5 },
          SCA: { max: 148.0, min: 122.0 },
          ST: { max: 144.0, min: 116.0 }
        },
        2023: {
          OC: { max: 176.0, min: 155.5 },
          BC: { max: 173.0, min: 141.0 },
          BCM: { max: 173.0, min: 150.0 },
          MBC: { max: 162.5, min: 131.5 },
          SC: { max: 164.0, min: 93.5 },
          SCA: { max: 144.0, min: 118.0 },
          ST: { max: 140.0, min: 112.0 }
        }
      },
      ranks: {
        2025: { OC: 81961, BC: 121647, BCM: 96487, MBC: 148028, SC: 206085, SCA: null, ST: 217345 },
        2024: { OC: 77000, BC: 115000, BCM: 91000, MBC: 140000, SC: 196000, SCA: null, ST: 206000 },
        2023: { OC: 73000, BC: 109000, BCM: 86000, MBC: 133000, SC: 186000, SCA: null, ST: 196000 }
      }
    },
    {
      name: "Civil Engineering",
      code: "CE",
      cutoffs: {
        2025: {
          OC: { max: 150.0, min: 133.0 },
          BC: { max: 148.0, min: 121.0 },
          BCM: { max: 140.0, min: 111.0 },
          MBC: { max: 140.0, min: 111.0 },
          SC: { max: 130.0, min: 101.0 },
          SCA: { max: 120.0, min: 93.0 },
          ST: { max: 115.0, min: 88.0 }
        },
        2024: {
          OC: { max: 147.0, min: 130.0 },
          BC: { max: 145.0, min: 118.0 },
          BCM: { max: 137.0, min: 108.0 },
          MBC: { max: 137.0, min: 108.0 },
          SC: { max: 127.0, min: 98.0 },
          SCA: { max: 117.0, min: 90.0 },
          ST: { max: 112.0, min: 85.0 }
        },
        2023: {
          OC: { max: 145.0, min: 128.0 },
          BC: { max: 142.0, min: 115.0 },
          BCM: { max: 134.0, min: 105.0 },
          MBC: { max: 134.0, min: 105.0 },
          SC: { max: 124.0, min: 95.0 },
          SCA: { max: 115.0, min: 88.0 },
          ST: { max: 110.0, min: 83.0 }
        }
      },
      ranks: {
        2025: { OC: 148000, BC: 238000, BCM: 151000, MBC: 210000, SC: 260000, SCA: null, ST: null },
        2024: { OC: 140000, BC: 225000, BCM: 143000, MBC: 200000, SC: 248000, SCA: null, ST: null },
        2023: { OC: 133000, BC: 214000, BCM: 136000, MBC: 190000, SC: 236000, SCA: null, ST: null }
      }
    }
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
  const [viewMode, setViewMode] = useState('cutoff'); // 'cutoff' | 'rank'

  const [customCutoff, setCustomCutoff] = useState(parseFloat(user.com) || 0);
  const [customName, setCustomName] = useState(user.name || '');
  const [customCommunity, setCustomCommunity] = useState(user.caste || 'OC');

  const userCommunity = customCommunity;

  // Determine eligibility per branch
  const getEligibility = (branch) => {
    const cutoffData = branch.cutoffs[selectedYear]?.[userCommunity];
    if (!cutoffData || cutoffData.min == null) return null;
    const required = cutoffData.min;
    if (customCutoff >= required) return 'eligible';
    if (customCutoff >= required - 10) return 'borderline';
    return 'not-eligible';
  };

  const formatRank = (val) => {
    if (val == null) return '—';
    return val.toLocaleString('en-IN');
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
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="fx-name-input"
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px',
                  textAlign: 'right',
                  margin: '0',
                  outline: 'none',
                  maxWidth: '120px'
                }}
              />
            </div>
            <div className="fx-banner-row">
              <span className="fx-banner-label">Your Cutoff</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="200"
                  value={customCutoff}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCustomCutoff(isNaN(val) ? 0 : val);
                  }}
                  className="fx-cutoff-input"
                  style={{
                    width: '80px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '16px',
                    textAlign: 'center',
                    margin: '0',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            <div className="fx-banner-row">
              <span className="fx-banner-label">Community</span>
              <span className="fx-banner-value">
                <select
                  value={customCommunity}
                  onChange={(e) => setCustomCommunity(e.target.value)}
                  className="fx-comm-select"
                  style={{
                    background: COMMUNITY_COLORS[customCommunity],
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '2px 10px',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                >
                  {FX_DATA.communities.map(c => (
                    <option key={c} value={c} style={{ background: '#fff', color: '#333' }}>
                      {c}
                    </option>
                  ))}
                </select>
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

        {/* Cutoff / Rank Toggle */}
        <div className="fx-view-toggle">
          <button
            className={`fx-toggle-btn ${viewMode === 'cutoff' ? 'active' : ''}`}
            onClick={() => setViewMode('cutoff')}
          >
            📊 Cutoff Marks
          </button>
          <button
            className={`fx-toggle-btn ${viewMode === 'rank' ? 'active' : ''}`}
            onClick={() => setViewMode('rank')}
          >
            🏆 Ranks
          </button>
        </div>
      </div>

      {/* ===== TNEA DATA TABLE ===== */}
      <div className="fx-table-wrapper">
        <table className="fx-table">
          {viewMode === 'cutoff' ? (
            // Cutoff Mode shows MAX / MIN columns
            <>
              <thead>
                <tr>
                  <th className="fx-th-branch" rowSpan={2}>Branch</th>
                  <th rowSpan={2}>Code</th>
                  {FX_DATA.communities.map(c => (
                    <th
                      key={c}
                      colSpan={2}
                      className={c === userCommunity ? 'fx-th-highlight' : ''}
                      style={c === userCommunity ? { background: COMMUNITY_COLORS[c], color: '#fff' } : {}}
                    >
                      {c}
                      {c === userCommunity ? ' ★' : ''}
                    </th>
                  ))}
                </tr>
                <tr>
                  {FX_DATA.communities.map(c => (
                    <React.Fragment key={c}>
                      <th
                        className={`fx-th-sub ${c === userCommunity ? 'fx-th-sub-user' : ''}`}
                        style={c === userCommunity ? { background: COMMUNITY_COLORS[c] + '33', color: COMMUNITY_COLORS[c] } : {}}
                      >MAX</th>
                      <th
                        className={`fx-th-sub ${c === userCommunity ? 'fx-th-sub-user' : ''}`}
                        style={c === userCommunity ? { background: COMMUNITY_COLORS[c] + '22', color: COMMUNITY_COLORS[c] } : {}}
                      >MIN</th>
                    </React.Fragment>
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
                        const val = branch.cutoffs[selectedYear]?.[c];
                        const isUser = c === userCommunity;
                        const maxElig = isUser && val?.max != null && customCutoff >= val.max;
                        const minElig = isUser && val?.min != null && customCutoff >= val.min;

                        return (
                          <React.Fragment key={c}>
                            <td className={`fx-td-val ${isUser ? 'fx-user-col' : ''} ${maxElig ? 'fx-eligible-cell' : ''}`}>
                              {val?.max ?? '—'}
                            </td>
                            <td className={`fx-td-val ${isUser ? 'fx-user-col' : ''} ${minElig && !maxElig ? 'fx-borderline-cell' : minElig ? 'fx-eligible-cell' : ''}`}>
                              {val?.min ?? '—'}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </>
          ) : (
            // Rank Mode shows single column per community
            <>
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
                        const rankVal = branch.ranks?.[selectedYear]?.[c];
                        const isUser = c === userCommunity;
                        const isEligible = isUser && elig === 'eligible';

                        return (
                          <td
                            key={c}
                            className={`fx-td-val ${isUser ? 'fx-user-col' : ''} ${isEligible ? 'fx-eligible-cell' : ''}`}
                          >
                            {formatRank(rankVal)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}
        </table>
      </div>

      {/* ===== USER SUMMARY ===== */}
      <div className="fx-summary-bar">
        <div className="fx-summary-card">
          <span className="fx-summ-label">Your Cutoff</span>
          <span className="fx-summ-val">{customCutoff}</span>
        </div>
        <div className="fx-summary-card">
          <span className="fx-summ-label">Community</span>
          <span className="fx-summ-val" style={{ color: COMMUNITY_COLORS[userCommunity] }}>{userCommunity}</span>
        </div>
        <div className="fx-summary-card">
          <span className="fx-summ-label">Eligible Branches</span>
          <span className="fx-summ-val">
            {FX_DATA.branches.filter(b => {
              const req = b.cutoffs[selectedYear]?.[userCommunity]?.min;
              return req != null && customCutoff >= req;
            }).length} / {FX_DATA.branches.length}
          </span>
        </div>
        <div className="fx-summary-card">
          <span className="fx-summ-label">Viewing</span>
          <span className="fx-summ-val">
            {viewMode === 'cutoff' ? `Cutoff Marks — ${selectedYear}` : `Ranks — ${selectedYear}`}
          </span>
        </div>
      </div>
    </div>
  );
}
