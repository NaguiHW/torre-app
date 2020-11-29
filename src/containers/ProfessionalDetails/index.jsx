import axios from '../../axios';
import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react/cjs/react.development';
import Navbar from '../../components/Navbar';
import './style.scss';

const ProfessionalDetails = () => {
  const [professional, setProfessional] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    const getProfessional = async () => {
      const response = await axios({
        method: 'get',
        url: `/bios/${username}`,
      });

      setProfessional({
        person: response.data.data.person,
        education: response.data.data.education,
        jobs: response.data.data.jobs,
        languages: response.data.data.languages,
        strengths: response.data.data.strengths,
      })
    }
    getProfessional();
  }, [])

  return professional.length === 0 ? <h1>Loading</h1> : (
    <div className="professional-details">
      <div className="hero" style={{ backgroundImage: `url(${professional.person.picture})` }}>
        <Navbar />
        <h1>{professional.person.name}</h1>
      </div>
      <div className="professional-info">
        <h1>{professional.person.professionalHeadline}</h1>
        <p>{professional.person.summaryOfBio}</p><br />
        {
          professional.education && (
            <>
              <p>Education:</p>
              <ul>
                {
                  professional.education.map(edu => (
                    <>
                      <li>
                        <p>Name: {edu.name}</p>
                        {
                          edu.organizations.length > 0 && (
                            <p>Organization: {edu.organizations[0].name}</p>
                          )
                        }
                        <p>From: {edu.fromMonth} {edu.fromYear}</p>
                        <p>To: {edu.toMonth} {edu.toYear}</p>
                      </li>
                    </>
                  ))
                }
              </ul>
              <br />
            </>
          )
        }
        {
          professional.jobs && (
            <>
              <p>Jobs:</p>
              <ul>
                {
                  professional.jobs.map(job => (
                    <>
                      <li>
                        <p>Name: {job.name}</p>
                        {
                          job.organizations.length > 0 && (
                            <p>Organization: {job.organizations[0].name}</p>
                          )
                        }
                        {
                          job.responsabilities?.map(respon => (
                            <p>{respon}</p>
                          ))
                        }
                        <p>From: {job.fromMonth} {job.fromYear}</p>
                        <p>To: {job.toMonth} {job.toYear}</p>
                      </li>
                    </>
                  ))
                }
              </ul>
              <br />
            </>
          )
        }
        <p>Languages:</p>
        {
          <ul>
            {
              professional.languages.map(lang => (
                <li>{lang.language} / {lang.fluency}</li>
              ))
            }
          </ul>
        }
        <br />
        <div className="strengths-container">
          <p>Strengths:</p>
          {
            professional.strengths.map(str => (
              <span>{str.name}</span>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
