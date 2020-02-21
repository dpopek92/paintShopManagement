import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const EmployeeNav = ({ handleLogOut }) => {
 const position = useSelector(state => state.employee.activePosition);
 return (
  <>
   <Nav.Item>
    <NavLink to="/" exact className="nav-link">
     Strona Główna
    </NavLink>
   </Nav.Item>
   {position && position === 'Lakiernia' && (
    <Nav.Item>
     <NavLink to="/paints" exact className="nav-link">
      Lakiery
     </NavLink>
    </Nav.Item>
   )}

   {/* KATALOG */}
   <NavDropdown title="Katalog" id="basic-nav-dropdown">
    <NavLink to="/catalog/colors" exact className="dropdown-link nav-link">
     Kolory
    </NavLink>

    <NavLink to="/catalog/handles" exact className="dropdown-link nav-link">
     Uchwyty
    </NavLink>

    <NavLink to="/catalog/millings" exact className="dropdown-link nav-link">
     Fronty
    </NavLink>

    <NavLink to="/catalog/glasscases" exact className="dropdown-link nav-link">
     Witryny
    </NavLink>

    <NavLink to="/catalog/veneers" exact className="dropdown-link nav-link">
     Forniry
    </NavLink>

    {/* <NavLink to="/catalog/customs" exact className="dropdown-link nav-link">
     Elementy niestandardowe
    </NavLink> */}
   </NavDropdown>

   <Nav.Item>
    <NavLink to="/settings/account" exact className="nav-link">
     Konto
    </NavLink>
   </Nav.Item>

   <NavLink to="" onClick={handleLogOut} className="dropdown-link nav-link">
    Wyloguj
   </NavLink>
  </>
 );
};

EmployeeNav.propTypes = {
 handleLogOut: PropTypes.func,
};

export default EmployeeNav;
