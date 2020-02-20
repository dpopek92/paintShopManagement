import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown, Button } from "react-bootstrap";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserNav = ({ handleNewOrder, handleLogOut }) => {
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
    <NavLink to="/prices" exact className="dropdown-link nav-link">
     Cennik
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/manual" exact className="dropdown-link nav-link">
     Jak zamawiać?
    </NavLink>
   </Nav.Item>
   <Nav.Item>
    <NavLink to="/contact" exact className="dropdown-link nav-link">
     Kontakt
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

UserNav.propTypes = {
 handleNewOrder: PropTypes.func,
 handleLogOut: PropTypes.func
};

export default UserNav;
