import React from 'react';
import './style.scss';

const Home = () => (
  <div className="home">
    <div className="hero1">
      <div className="logo">
        <h1>
          <span>T</span>orre<span>S</span>earch
        </h1>
      </div>
      <div className="content">
        <h1>
          Are you a <span>professional</span> or a <span>freelancer</span> looking for a job opportunity?
          <br />
          You are in the right place.
          <br />
          Start looking <span>now</span>.
        </h1>
        <button type="button">Search Opportunities</button>
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
      <button type="button">Search Professionals</button>
    </div>
  </div>
);

export default Home;
