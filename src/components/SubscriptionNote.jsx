import React, { useState } from 'react';
import Signup from './auth/Signup';
import Login from './auth/Login';

const SubscriptionNote = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="note-container">
      <h2>VIP Tip. Only subscribed users can see this sure tips</h2>
      <div className="note">
        <p>
          <button
            type="button"
            onClick={handleSignupClick}
            style={{
              cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none',
            }}
          >
            Sign up
          </button>
          {' '}
          or
          {' '}
          <button
            type="button"
            onClick={handleLoginClick}
            style={{
              cursor: 'pointer', textDecoration: 'underline', border: 'none', background: 'none',
            }}
          >
            Login
          </button>
          {' '}
          to access our weekly plan
          and receive our 20 odds prediction for just 20 USD.
          Join Now!
        </p>
        {showSignup && <Signup />}
        {showLogin && <Login />}
      </div>
    </div>
  );
};

export default SubscriptionNote;
