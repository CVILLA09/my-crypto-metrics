import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearSelectedDetails } from '../redux/detailSlice';
import 'font-awesome/css/font-awesome.min.css';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(clearSelectedDetails());
  };

  return (
    <div className="navbar">
      <NavLink to="/" onClick={handleGoBack}>
        <i className="fa fa-arrow-left left-arrow" />
      </NavLink>
      <span className="navbar-title">my crypto metrics</span>
      <span className="navbar-icons">
        <i className="fa fa-microphone mic-icon" />
        <i className="fa fa-cog gear-icon" />
      </span>
    </div>
  );
};

export default Navbar;
