import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Job from '../../components/Job';
import Navbar from '../../components/Navbar';
import './style.scss';

const Jobs = () => {
  const [state, setState] = useState({
    page: 1,
    size: 20,
    offset: 0,
    jobs: [],
  });

  useEffect(() => {
    const req = async () => {

      const response = await axios.post(`https://search.torre.co/opportunities/_search/?size=${state.size}&offset=${state.offset}`);
      setState({
        ...state,
        jobs: response.data.results.map(job => ({
          id: job.id,
          title: job.objective,
          organization: job.organizations,
          skills: job.skills,
          type: job.type,
          status: job.status,
          deadline: job.deadline,
          locations: job.locations,
          compensation: job.compensation,
        }))
      })
      console.log(response.data.results)
    }

    req();
  }, [state.size, state.offset])

  return (
    <div className="jobs">
      <div className="hero">
        <Navbar />
        <h1>Job Opportunity</h1>
      </div>
      <div className="jobs-container">
        {
          state.jobs?.map(job => (
            <Job
              title={job.title}
              imgSrc={job.organization[0].picture}
              organizationName={job.organization[0].name}
              skills={job.skills}
              location={job.locations[0]}
              type={job.type}
              deadline={job.deadline}
              compensation={job.compensation}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Jobs;
