import axios from '../../axios';
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

  const [formData, setFormData] = useState({});
  const [show, setShow] = useState({
    searchArea: "none",
    button: "display"
  });

  const pages = () => {
    const { actualPage, size, total } = state;
    const lastPage = total % size === 0 ? total / size : Math.ceil(total / size);
    const menuLength = 7;

    if (actualPage < 5) {
      return lastPage < menuLength
        ? Array.from({ length: lastPage }, (x, i) => i + 1)
        : Array.from({ length: menuLength }, (x, i) => i + 1)
    }
    if (actualPage > lastPage - 4) {
      return lastPage < menuLength
        ? Array.from({ length: lastPage }, (x, i) => i + 1)
        : Array.from({ length: menuLength }, (x, i) => lastPage - 6 + i)
    }
    if (actualPage > 4 && actualPage < lastPage - 3) {
      return Array.from({ length: menuLength }, (x, i) => actualPage - 3 + i)
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
    const lastPage = total % size === 0 ? total / size : Math.ceil(total / size);
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

  const toggleAdvanceSearch = e => {
    const text = e.target;
    if (show.searchArea === "none") {
      setShow({
        searchArea: "inline",
        button: "none",
      });
      text.innerHTML = 'Less Options -'
    } else {
      setShow({
        searchArea: "none",
        button: "inline",
      });
      text.innerHTML = 'More Options +'
    }
  };

  const clearField = e => {
    const radioButtons = e.target.parentElement.children;

    for (let i = 1; i < radioButtons.length - 2; i += 2) {
      radioButtons[i].checked = false;
    }
    delete formData[radioButtons[1].name]
  }

  const handleChange = e => {
    const element = e.target;
    let value;

    if (element.name === "remote") {
      value = element.value === "yes"

      setFormData({
        ...formData,
        [element.name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [element.name]: element.value,
      });
    }
  }

  const clearText = e => {
    const textField = e.target.parentElement.children[2];
    textField.value = '';

    delete formData[textField.name];
  }

  const search = async e => {
    e.preventDefault();
    const { actualPage, size } = state;
    const offset = (actualPage - 1) * size;
    const hasData = Object.keys(formData).length > 0;

    if (hasData) {
      const response = await axios({
        method: 'post',
        url: `/opportunities/search?size=${size}&offset=${offset}`,
        data: formData,
      });

      setState({
        ...state,
        jobs: response.data.data.map(job => ({
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
      });

    }
  }

  useEffect(() => {
    const req = async () => {
      const { actualPage, size } = state;
      const offset = (actualPage - 1) * size

      const response = await axios({
        method: 'post',
        url: `/opportunities/search?size=${size}&offset=${offset}`,
      });

      setState({
        ...state,
        jobs: response.data.data.map(job => ({
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
      <div className="search">
        <form className="primary" onSubmit={search}>
          <label htmlFor="skill">Search by skill/role</label><br />
          <input type="text" name="skill/role" id="skill" placeholder="Ex: javascript, marketing..." onChange={handleChange} />
          <button type="button" className="clear" onClick={clearText}>Clear</button>
        </form>
        <button type="button" style={{ display: `${show.button}` }} onClick={search}>Search</button>
        <p className="more-options" onClick={toggleAdvanceSearch}>More Options +</p>
        <div className="secondary-search" style={{ display: `${show.searchArea}` }}>
          <form className="secondary">
            <label htmlFor="organization">Search by organization</label><br />
            <input type="text" name="organization" id="organization" placeholder="Ex: Torre" onChange={handleChange} />
            <button type="button" className="clear" onClick={clearText}>Clear</button>
          </form>
          <fieldset onChange={handleChange}>
            <p className="radio-area-title">Remote</p>
            <input type="radio" name="remote" id="yes" value="yes" /><label htmlFor="yes">Yes</label>
            <input type="radio" name="remote" id="no" value="no" /><label htmlFor="no">No</label>
            <button type="button" className="clear" onClick={clearField}>Clear Field</button>
          </fieldset>
          <fieldset onChange={handleChange}>
            <p className="radio-area-title">Type</p>
            <input type="radio" name="type" id="fulltime" value="full-time-employment" /><label htmlFor="fulltime">Full-time</label>
            <input type="radio" name="type" id="parttime" value="part-time-employment" /><label htmlFor="parttime">Part-time</label>
            <input type="radio" name="type" id="freelance" value="freelance-gigs" /><label htmlFor="freelance">Freelance</label>
            <input type="radio" name="type" id="internships" value="internships" /><label htmlFor="internships">Internships</label>
            <button type="button" className="clear" onClick={clearField}>Clear Field</button>
          </fieldset>
          <fieldset onChange={handleChange}>
            <p className="radio-area-title">Status</p>
            <input type="radio" name="status" id="open" value="open" /><label htmlFor="open">Open</label>
            <input type="radio" name="status" id="closed" value="closed" /><label htmlFor="closed">Closed</label>
            <button type="button" className="clear" onClick={clearField}>Clear Field</button>
          </fieldset>
          <button type="button" onClick={search}>Search</button>
        </div>
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
              id={job.id}
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
