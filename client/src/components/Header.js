import React from 'react';

const Header = ({ toggleForm, isLogin }) => {
  return (
    <div className="header">
      <div className="service-name">NAME OF SERVICE</div>
      <div className="header-right">
        <div className="language-selector">
          <span>🌐 UA ▼</span>
          <button className="sign-in-btn" onClick={toggleForm}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;