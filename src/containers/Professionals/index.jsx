import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Professional from '../../components/Professional';
import './style.scss';

const Professionals = () => {
  const [state, setState] = useState({
    actualPage: 1,
    size: 20,
    professionals: [],
    total: 0,
  });

  const [formData, setFormData] = useState({});

  const updateSize = e => {
    setState({
      ...state,
      size: Number(e.target.innerHTML),
    })
  }

  const goTo = e => {
    let newPage = state.actualPage;
    if (e.target.innerHTML === 'Prev') {
      newPage--;
      setState({
        ...state,
        actualPage: newPage,
      });
    }
    if (e.target.innerHTML === 'Next') {
      newPage++
      setState({
        ...state,
        actualPage: newPage,
      });
    }
  }

  const clearField = e => {
    const radioButtons = e.target.parentElement.children;

    for (let i = 1; i < radioButtons.length - 2; i += 2) {
      radioButtons[i].checked = false;
    }
    delete formData[radioButtons[1].name]
  };

  const handleChange = e => {
    const element = e.target;
    let value;

    if (element.name === "remoter") {
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

  const search = async e => {
    e && e.preventDefault();
    const { actualPage, size } = state;
    const offset = (actualPage - 1) * size;
    const hasData = Object.keys(formData).length > 0;
    let response;

    if (hasData) {
      response = await axios({
        method: 'post',
        url: `/people/search?size=${size}&offset=${offset}`,
        data: formData,
      });
    } else {
      response = await axios({
        method: 'post',
        url: `/people/search?size=${size}&offset=${offset}`,
      });
    }

    setState({
      ...state,
      professionals: response.data.data.map(professional => ({
        username: professional.username,
        location: professional.locationName,
        name: professional.name,
        openTo: professional.openTo,
        picture: professional.picture,
        skills: professional.skills,
        professionalHeadline: professional.professionalHeadline,
      })),
      total: response.data.total,
    })
  }

  useEffect(() => {
    search();
    window.scrollTo(0, 0)
  }, [state.size, state.actualPage])

  return state.professionals.length === 0 ? <h1>Loading</h1> : (
    <div className="professionals">
      <div className="hero">
        <Navbar />
        <h1>Professionals</h1>
      </div>
      <div className="search">
        <fieldset onChange={handleChange}>
          <p className="radio-area-title">Remote?</p>
          <input type="radio" name="remoter" id="yes" value="yes" /><label htmlFor="yes">Yes</label>
          <input type="radio" name="remoter" id="no" value="no" /><label htmlFor="no">No</label>
          <button type="button" className="clear" onClick={clearField}>Clear Field</button>
        </fieldset>
        <fieldset onChange={handleChange}>
          <p className="radio-area-title">Open to:</p>
          <input type="radio" name="opento" id="advising" value="advising" /><label htmlFor="advising">Advising</label>
          <input type="radio" name="opento" id="freelance-gigs" value="freelance-gigs" /><label htmlFor="freelance-gigs">Freelance</label>
          <input type="radio" name="opento" id="full-time-employment" value="full-time-employment" /><label htmlFor="full-time-employment">Full-time</label>
          <input type="radio" name="opento" id="hiring" value="hiring" /><label htmlFor="hiring">Hiring</label>
          <input type="radio" name="opento" id="internships" value="internships" /><label htmlFor="internships">Internships</label>
          <input type="radio" name="opento" id="mentoring" value="mentoring" /><label htmlFor="mentoring">Mentoring</label>
          <input type="radio" name="opento" id="part-time-employment" value="part-time-employment" /><label htmlFor="part-time-employment">Part-time</label>
          <button type="button" className="clear" onClick={clearField}>Clear Field</button>
        </fieldset>
        <button type="button" onClick={search}>Search</button>
      </div>
      <div className="professionals-per-page">
        <p>Professionals per page:</p>
        <button type="button" className={state.size === 20 ? 'button-selected' : 'button'} onClick={updateSize}>20</button>
        <button type="button" className={state.size === 60 ? 'button-selected' : 'button'} onClick={updateSize}>60</button>
        <button type="button" className={state.size === 100 ? 'button-selected' : 'button'} onClick={updateSize}>100</button>
      </div>
      <div className="professionals-container">
        {
          state.professionals.map(professional => (
            <Professional
              username={professional.username}
              picture={professional.picture}
              name={professional.name}
              professionalHeadline={professional.professionalHeadline}
              location={professional.location}
              openTo={professional.openTo}
              skills={professional.skills}
            />
          ))
        }
      </div>
      <div className="pages">
        <button type="button" onClick={goTo} disabled={state.actualPage === 1}>Prev</button>
        <button type="button" onClick={goTo} disabled={state.actualPage === Math.ceil(state.total / state.size)}>Next</button>
      </div>
    </div>
  );
};

export default Professionals;
