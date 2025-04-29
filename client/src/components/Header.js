import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <header className="header">
      <div className="logo">NAME OF SERVICE</div>
      <nav className="nav">
        <a href="/">Головна</a>
        <a href="/tv-shows">ТБ Шоу</a>
        <a href="/movies">Фільми</a>
        <a href="/new">Що зараз нового</a>
        <a href="/favorites">Улюблені</a>
      </nav>
      <div className="user-options">
        <span className="language">🌐 UA</span>
        <div className="profile-dropdown">
          <span className="profile" onClick={toggleDropdown}>👤</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/login">Авторизація</Link>
              <Link to="/register">Реєстрація</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;