import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Nav, NavDropdown, Button } from 'react-bootstrap';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminNav = ({ handleNewOrder, handleLogOut }) => {
 return (
  <>
   <Nav.Item>
    <Button onClick={handleNewOrder}>
     <FontAwesomeIcon icon={faFolderPlus} /> Nowe zamówienie
    </Button>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/" exact className="nav-link">
     Strona Główna
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/production" exact className="nav-link">
     Produkcja
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/timetable" exact className="nav-link">
     Planowanie
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/paints" exact className="nav-link">
     Lakiery
    </NavLink>
   </Nav.Item>

   <Nav.Item>
    <NavLink to="/customers" exact className="dropdown-link nav-link">
     Klienci
    </NavLink>
   </Nav.Item>

   <Nav.Item>
    <NavLink to="/employees" exact className="dropdown-link nav-link">
     Pracownicy
    </NavLink>
   </Nav.Item>

   {/* STATYSTYKI */}
   <NavDropdown title="Statystyki" id="basic-nav-dropdown">
    <NavLink
     to="/statistics/production"
     disabled
     exact
     className="dropdown-link nav-link"
    >
     Produkcji
    </NavLink>

    <NavLink
     to="/statistics/employees"
     disabled
     exact
     className="dropdown-link nav-link"
    >
     Pracowników
    </NavLink>

    <NavLink
     to="/statistics/customers"
     disabled
     exact
     className="dropdown-link nav-link"
    >
     Klientów
    </NavLink>
   </NavDropdown>

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

    <NavLink to="/catalog/customs" exact className="dropdown-link nav-link">
     Elementy niestandardowe
    </NavLink>
   </NavDropdown>

   <Nav.Item>
    <NavLink to="/manual" exact className="dropdown-link nav-link">
     Jak zamawiać?
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/settings/global" exact className="dropdown-link nav-link">
     Ustawienia
    </NavLink>
   </Nav.Item>

   <NavDropdown alignRight title="Konto" id="basic-nav-dropdown">
    <NavLink to="/settings/account" exact className="dropdown-link nav-link">
     Moje dane
    </NavLink>
    <NavDropdown.Divider />
    <NavLink to="" onClick={handleLogOut} className="dropdown-link nav-link">
     Wyloguj
    </NavLink>
   </NavDropdown>
  </>
 );
};

AdminNav.propTypes = {
 handleNewOrder: PropTypes.func,
 handleLogOut: PropTypes.func,
};

export default AdminNav;
