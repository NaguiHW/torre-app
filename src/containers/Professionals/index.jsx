import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
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

  const updateSize = e => {
    setState({
      ...state,
      size: Number(e.target.innerHTML),
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

  useEffect(() => {
    const req = async () => {
      const { actualPage, size } = state;
      const offset = (actualPage - 1) * size

      const response = await axios.post(`https://search.torre.co/people/_search/?size=${size}&offset=${offset}`);
      console.log(response.data);
      setState({
        ...state,
        professionals: response.data.results.map(professional => ({
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

    req();
    window.scrollTo(0, 0)
  }, [state.size, state.actualPage])
  
  return state.professionals.length === 0 ? <h1>Loading</h1> : (
    <div className="professionals">
      <div className="hero">
        <Navbar />
        <h1>Professionals</h1>
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

export default Professionals;
