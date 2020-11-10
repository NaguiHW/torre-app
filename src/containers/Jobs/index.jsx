import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Job from '../../components/Job';
import Navbar from '../../components/Navbar';
import './style.scss';

const Jobs = () => {
  const [state, setState] = useState({
    actualPage: 1,
    size: 20,
    jobs: [],
    total: 0,
  });

  const pages = () => {
    const { actualPage, size, total } = state;
    const lastPage = total%size === 0 ? total/size : Math.ceil(total/size);
    const menuLength = 7;
    
    if (actualPage < 5) {
      return lastPage < menuLength
        ? Array.from({length: lastPage}, (x, i) => i + 1)
        : Array.from({length: menuLength}, (x, i) => i + 1)
    }
    if (actualPage > lastPage - 4) {
      return lastPage < menuLength
        ? Array.from({length: lastPage}, (x, i) => i + 1)
        : Array.from({length: menuLength}, (x, i) => lastPage - 6 + i)
    }
    if (actualPage > 4 && actualPage < lastPage - 3) {
      return Array.from({length: menuLength}, (x, i) => actualPage - 3 + i)
    }
  }

  const updatePage = e => {
    setState({
      ...state,
      actualPage: e.target.innerHTML,
    })
  }

  const goTo = e => {
    const { size, total } = state;
    const lastPage = total%size === 0 ? total/size : Math.ceil(total/size);
    if (e.target.innerHTML === 'First') {
      setState({
        ...state,
        actualPage: 1,
      });
    }
    if (e.target.innerHTML === 'Last') {
      setState({
        ...state,
        actualPage: lastPage,
      });
    }
  }
  
  const updateSize = e => {
    setState({
      ...state,
      size: Number(e.target.innerHTML),
    })
  }

  useEffect(() => {
    const req = async () => {
      const { actualPage, size } = state;
      const offset = (actualPage - 1) * size

      const response = await axios.post(`https://search.torre.co/opportunities/_search/?size=${size}&offset=${offset}`);
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
        })),
        total: response.data.total,
      })
    }

    req();
    window.scrollTo(0, 0)
  }, [state.size, state.actualPage])

  return (
    <div className="jobs">
      <div className="hero">
        <Navbar />
        <h1>Job Opportunity</h1>
      </div>
      <div className="jobs-per-page">
        <p>Jobs per page:</p>
        <button type="button" className={state.size === 20 ? 'button-selected' : 'button'} onClick={updateSize}>20</button>
        <button type="button" className={state.size === 60 ? 'button-selected' : 'button'} onClick={updateSize}>60</button>
        <button type="button" className={state.size === 100 ? 'button-selected' : 'button'} onClick={updateSize}>100</button>
      </div>
      <div className="jobs-container">
        {
          state.jobs?.map(job => (
            <Job
              title={job.title}
              imgSrc={job.organization[0]?.picture}
              organizationName={job.organization[0]?.name}
              skills={job.skills}
              location={job.locations[0]}
              type={job.type}
              deadline={job.deadline}
              compensation={job.compensation}
            />
          ))
        }
      </div>
      <div className="pages">
        <span onClick={goTo}>First</span>
        {
          pages().map(page => (
            <p onClick={updatePage}>{page}</p>
          ))
        }
        <span onClick={goTo}>Last</span>
      </div>
    </div>
  );
};

export default Jobs;
