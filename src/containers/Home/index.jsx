import React from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import './style.scss';

const Home = () => (
  <div className="home">
    <div className="hero1">
      <Navbar />
      <div className="content">
        <h1>
          Are you a <span>professional</span> or a <span>freelancer</span> looking for a job opportunity?
          <br />
          You are in the right place.
          <br />
          Start looking <span>now</span>.
        </h1>
        <Link to="/jobs" className="button">
          Search Opportunities
        </Link>
      </div>
    </div>
    <div className="hero2">
      <h1>
        Are you looking for a <span>qualified professional</span>? Or a <span>freelancer</span>?
        <br />
        You are in the right place.
        <br />
        Start looking <span>now</span>.
      </h1>
      <Link to="/professionals" className="button">
        Search Professionals
      </Link>
    </div>
  </div>
);

export default Home;
