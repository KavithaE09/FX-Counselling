import React, { useState, useEffect } from 'react';
import AuthCard from './components/AuthCard';
import CollegeFinder from './components/CollegeFinder';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('tnea_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user session', err);
        localStorage.removeItem('tnea_user');
      }
    }
    setSessionChecked(true);
  }, []);

  const handleLoginSuccess = (user) => {
    localStorage.setItem('tnea_user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('tnea_user');
    setCurrentUser(null);
  };

  if (!sessionChecked) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-blue"></div>
      </div>
    );
  }

  return (
    <>
      {currentUser ? (
        <CollegeFinder user={currentUser} onLogout={handleLogout} />
      ) : (
        <div className="auth-container">
          <AuthCard onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </>
  );
}

export default App;
