import React from 'react';
import './style.scss';

const Member = ({ imgSrc, name, professionalHeadline }) => (
  <div className="member">
    <div className="image" style={{backgroundImage: `url(${imgSrc})`}} />
    <div className="info">
      <h1>{name}</h1>
      <p>{professionalHeadline}</p>
    </div>
  </div>
);

export default Member;
