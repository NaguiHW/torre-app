import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './style.scss';

const Professional = ({
  username,
  picture,
  name,
  professionalHeadline,
  location,
  openTo,
  skills,
}) => (
  <Link to={`/professionals/${username}`}>
    <div className="professional">
    <div className="title" style={{backgroundImage: `url(${picture})`}} />
      <div className="info">
        <h1>{name}</h1>
        <h2 className="professional-headline">{professionalHeadline}</h2>
        <p>Location: <b>{location ? location : '-'}</b></p>
        {
          openTo.length > 0 && (
            <>
              <p>Open to:</p>
              <ul>
                {
                  openTo.slice(0, 5).map(option => (
                    <li>{option}</li>
                  ))
                }
              </ul>
            </>
          )
        }
        <h3>Skills:</h3>
        <div className="skills-container">
          {
            skills?.slice(0, 5).map(skill => (
              <h5>{skill.name}</h5>
            ))
          }
        </div>
      </div>
    </div>
  </Link>
);

export default Professional;
