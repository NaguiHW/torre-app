import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './style.scss'

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">
      <h1>
        <span>T</span>orre<span>S</span>earch
      </h1>
    </div>
    <div className="links">
      <Link to="/jobs" className="button">
        Opportunities
      </Link>
      <Link to="/professionals" className="button">
        Profesionals
      </Link>
    </div>
  </nav>
);

export default Navbar;
