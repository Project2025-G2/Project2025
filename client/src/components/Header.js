import React from 'react';
import './Header.css';

const Header = () => {
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
        <span className="profile">👤</span>
      </div>
    </header>
  );
};

export default Header;