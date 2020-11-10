import React from 'react';
import './style.scss';

const Job = ({
  title,
  imgSrc,
  organizationName,
  skills,
  location,
  type,
  deadline,
  compensation,
}) => (
  <div className="job">
    <div className="title" style={{backgroundImage: `url(${imgSrc})`}} />
    <div className="info">
      <h1>{title}</h1>
      <h2 className="organization-name">{organizationName}</h2>
      <p>Location: <b>{location ? location : '-'}</b></p>
      <p>Type: <b>{type ? type : '-'}</b></p>
      <p>Deadline: <b>{deadline ? deadline.split('T', 1) : '-'}</b></p>
      <p>Min: <b>{compensation?.data ? compensation.data.minAmount : '-'}</b></p>
      <p>Max: <b>{compensation?.data ? compensation.data.maxAmount : '-'}</b></p>
      <p>Currency: <b>{compensation?.data ? compensation.data.currency : '-'}</b></p>
      <p>Periodicity: <b>{compensation?.data ? compensation.data.periodicity : '-'}</b></p>
      <h3>Skills:</h3>
      <div className="skills-container">
        {
          skills?.map(skill => (
            <h5>{skill.name}</h5>
          ))
        }
      </div>
    </div>
  </div>
);

export default Job;
