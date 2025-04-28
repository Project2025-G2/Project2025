import React from 'react';
import './Poster.css';

const Poster = ({ src, alt }) => {
  return (
    <div className="poster">
      <img src={src} alt={alt} />
    </div>
  );
};

export default Poster;