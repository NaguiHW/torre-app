import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Member from '../../components/Member';
import Navbar from '../../components/Navbar';
import './style.scss';

const JobDetails = () => {
  const [state, setState] = useState({
    opportunity: [],
  })
  const [benefits, setBenefits] = useState([]);
  const [stockCompensations, setStockCcompensations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getOpportunity = async () => {
      const response = await axios({
        method: 'get',
        url: `/opportunity/${id}`,
      });

      setState({
        ...state,
        opportunity: {
          organization: response.data.data.organizations[0],
          title: response.data.data.objective,
          details: response.data.data.details,
          image: response.data.data.attachments[0]?.address,
          type: response.data.data.commitment.code,
          compensation: response.data.data.compensation,
          deadline: response.data.data.deadline,
          languages: response.data.data.languages,
          members: response.data.data.members,
          place: response.data.data.place,
          strengths: response.data.data.strengths,
          timezones: response.data.data.timezones,
        }
      });
      setBenefits(response.data.data.details.filter(detail => detail.code === 'benefits'));
      setStockCcompensations(response.data.data.details.filter(detail => detail.code === 'stock-compensations'));
    }
    getOpportunity();
  }, [])

  return state.opportunity.length === 0 ? <h1>Loading</h1> : (
    <div className="job-details">
      <div className="hero" style={{ backgroundImage: `url(${state.opportunity?.image})` }}>
        <Navbar />
        <h1>{state.opportunity.title}</h1>
      </div>
      <div className="organization-info">
        <h1>{state.opportunity.organization?.name}</h1>
        {
          benefits.length > 0
          && (
            <>
              <h3>benefits</h3>
              {
                <>
                  <ul>
                    {
                      benefits?.map(benefit => (
                        <li>{benefit.content}</li>
                      ))
                    }
                  </ul>
                  <br />
                </>
              }
            </>
          )
        }
        {
          stockCompensations.length > 0 && (
            <>
              <h3>stock compensations</h3>
              {
                <>
                  <ul>
                    {
                      stockCompensations?.map(compensation => (
                        <li>{compensation.content}</li>
                      ))
                    }
                  </ul>
                  <br />
                </>
              }
            </>
          )
        }
        {
          state.opportunity.details.map(detail => (
            (detail.code !== 'benefits' && detail.code !== 'stock-compensations') &&
            <>
              <h3>{detail.code}</h3>
              {
                detail.content.split('\n').map(value => (
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
        {
          state.opportunity.members.map(member => (
            <Member
              imgSrc={member.person.picture}
              name={member.person.name}
              professionalHeadline={member.person.professionalHeadline}
            />
          ))
        }
      </div>
    </div>
  );
};

export default JobDetails;
