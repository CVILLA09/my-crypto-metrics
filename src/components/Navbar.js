import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => (
  <div className="navbar">
    <span className="left-arrow">&#60;</span>
    <span className="navbar-title">Crypto Currencies</span>
    <span className="navbar-icons">
      <i className="fa fa-microphone mic-icon" />
      <i className="fa fa-cog gear-icon" />

    </span>
  </div>
);

export default Navbar;
