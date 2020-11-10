import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './style.scss';

const JobDetails = () => {
  const [state, setState] = useState({
    opportunity: [],
  })
  const { id } = useParams();

  useEffect(() => {
    const getOpportunity = async () => {
      const response = await axios.get(`https://torre.co/api/opportunities/${id}`)
      console.log(response.data);
      setState({
        ...state,
        opportunity: {
          organization: response.data.organizations,
          title: response.data.objective,
          details: response.data.details,
          image: response.data.attachments[0]?.address,
          type: response.data.commitment.code,
          compensation: response.data.compensation,
          deadline: response.data.deadline,
          languages: response.data.languages,
          members: response.data.members,
          place: response.data.place,
          strengths: response.data.strengths,
          timezones: response.data.timezones,
        }
      })
    }
      getOpportunity();
  }, [])

  return state.opportunity.length === 0 ? <h1>Loading</h1> : (
    <div className="job-details">
      <div className="hero" style={{backgroundImage: `url(${state.opportunity?.image})`}}>
        <Navbar />
        <h1>{state.opportunity.title}</h1>
      </div>
      <div className="organization-info">
        <h1>{state.opportunity.organization[0]?.name}</h1>
        {
          state.opportunity.details.map(detail => (
            <>
              <h3>{detail.code}</h3>
              {
                detail.content.split('\n').map(value=> (
                  <span>{value}<br /></span>
                ))
              }
              <br />
            </>
          ))
        }
      </div>
      <div className="job-info">
        <h3>Job Info</h3>
        <p>Job type: {state.opportunity.type ? state.opportunity.type : '-'}</p>
        <p>Currency: {state.opportunity.compensation.currency ? state.opportunity.compensation.currency : '-'}</p>
        <p>Min amount: {state.opportunity.compensation.minAmount ? state.opportunity.compensation.minAmount : '-'}</p>
        <p>Max amount: {state.opportunity.compensation.maxAmount ? state.opportunity.compensation.maxAmount : '-'}</p>
        <p>Periodicity: {state.opportunity.compensation.periodicity ? state.opportunity.compensation.periodicity : '-'}</p>
        <p>Apply before: {state.opportunity.deadline ? state.opportunity.deadline.split('T', 1) : '-'}</p>
        <p>Languages:</p>
        <ul>
          {
            state.opportunity.languages?.map(language => (
              <li>{language.language.name} / {language.fluency}</li>
            ))
          }
        </ul>
        <p>Remote: {state.opportunity.place.remote ? 'true' : 'false'}</p>
        <p>Anywhere: {state.opportunity.place.anywhere ? 'true' : 'false'}</p>
        {
          state.opportunity.place.location.length > 0 && (
            <>
              <p>Location:</p>
              <ul>
                {
                  state.opportunity.place.location.map(location => (
                    <li>{location.id}</li>
                  ))
                }
              </ul>
            </>
          )
        }
        {
          state.opportunity.timezones && (
            <>
              <p>Timezones:</p>
              <ul>
                {
                  state.opportunity.timezones.map(timezone => (
                    <li>{timezone}</li>
                  ))
                }
              </ul>
            </>
          )
        }
        <p>Skills:</p>
        <ul>
          {
            state.opportunity.strengths.map(strength => (
              <li>{strength.name} / {strength.experience}</li>
            ))
          }
        </ul>
      </div>
      <div className="members">
        
      </div>
    </div>
  );
};

export default JobDetails;
