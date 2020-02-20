import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

const DisplayNav = ({ handleLogOut }) => {
 return (
  <>
   <Nav.Item>
    <NavLink to="/" exact className="nav-link">
     Strona Główna
    </NavLink>
   </Nav.Item>

   <NavLink to="" onClick={handleLogOut} className="nav-link">
    Wyloguj
   </NavLink>
  </>
 );
};

DisplayNav.propTypes = {
 handleLogOut: PropTypes.func
};

export default DisplayNav;
