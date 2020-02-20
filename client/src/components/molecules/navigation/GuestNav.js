import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const GuestNav = () => {
 return (
  <>
   <Nav.Item>
    <NavLink to="/login" exact className="nav-link">
     <FontAwesomeIcon icon={faUser} /> Zaloguj
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/register" exact className="nav-link">
     <FontAwesomeIcon icon={faUserPlus} /> Zarejestruj
    </NavLink>
   </Nav.Item>
  </>
 );
};

export default GuestNav;
