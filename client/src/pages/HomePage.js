import React, { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Poster from '../components/Poster';
import postersData from '../data/postersData';
import './HomePage.css';

const HomePage = () => {
  const postersRef = useRef(null);

  const scrollLeft = () => {
    if (postersRef.current) {
      postersRef.current.scrollBy({ left: -390, behavior: 'smooth' }); // 390px - ширина одного постера
    }
  };

  const scrollRight = () => {
    if (postersRef.current) {
      postersRef.current.scrollBy({ left: 390, behavior: 'smooth' }); // 390px - ширина одного постера
    }
  };

  return (
    <div className="home-page">
      <Header />
      <section className="posters-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          ❮
        </button>
        <section className="posters" ref={postersRef}>
          {postersData.map((poster, index) => (
            <Poster key={index} src={poster.src} alt={poster.alt} />
          ))}
        </section>
        <button className="scroll-button right" onClick={scrollRight}>
          ❯
        </button>
      </section>
      <section className="cta">
        {/*<h2>Update Dockerfile</h2>*/}
        <h2>TEAM B</h2>
        <div className="search-bar">
          <input type="text" placeholder="Що сьогодні хочеш переглянути?" />
          <span className="search-icon">🔍</span>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;