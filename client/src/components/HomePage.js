import React, { useRef } from 'react';
import './HomePage.css';

const HomePage = () => {
  const postersRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = e.pageX - postersRef.current.offsetLeft;
    const scrollLeft = postersRef.current.scrollLeft;

    const handleMouseMove = (e) => {
      e.preventDefault();
      const x = e.pageX - postersRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      postersRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="home-page">
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

      <section
        className="posters"
        ref={postersRef}
        onMouseDown={handleMouseDown}
      >
        <div className="poster">
          <img src="/images/dog-man-poster.jpg" alt="Flow" />
        </div>
        <div className="poster">
          <img src="/images/flow-poster.jpg" alt="Flow" />
        </div>
        <div className="poster">
          <img src="/images/dragon-poster.jpg" alt="How to Train Your Dragon 3" />
        </div>
        <div className="poster">
          <img src="/images/monkey-poster.jpg" alt="The Monkey" />
        </div>
        <div className="poster">
          <img src="/images/captain-america-poster.jpg" alt="Captain Marvel" />
        </div>
        <div className="poster">
          <img src="/images/true-spider-man-poster.jpg" alt="Placeholder" />
        </div>
      </section>

      <section className="cta">
        <h2>Виріши проблему з вибором фільму вже зараз!</h2>
        <div className="search-bar">
          <input type="text" placeholder="Що сьогодні хочеш переглянути?" />
          <span className="search-icon">🔍</span>
        </div>
      </section>

      <footer className="footer">
        <p>© FEI-33 Team B, 2025</p>
      </footer>
    </div>
  );
};

export default HomePage;