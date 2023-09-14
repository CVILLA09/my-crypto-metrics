import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './Navbar.css';

const Navbar = () => (
  <div className="navbar">
    <i className="fa fa-arrow-left left-arrow" />
    <span className="navbar-title">my crypto metrics</span>
    <span className="navbar-icons">
      <i className="fa fa-microphone mic-icon" />
      <i className="fa fa-cog gear-icon" />

    </span>
  </div>
);

export default Navbar;
