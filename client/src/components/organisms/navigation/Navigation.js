import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import logo from 'assets/images/logo.jpg';
import UserNav from 'components/molecules/navigation/UserNav';
import AdminNav from 'components/molecules/navigation/AdminNav';
import GuestNav from 'components/molecules/navigation/GuestNav';
import DisplayNav from 'components/molecules/navigation/DisplayNav';
import EmployeeNav from 'components/molecules/navigation/EmployeeNav';
import OrderElements from 'components/molecules/navigation/OrderFormData';
import IsNewOrder from 'components/organisms/modals/orderForm/IsNewOrder';
import { logOutUser } from 'actions/auth';

const StyledNav = styled(Nav)`
 .nav-link {
  margin: 0 5px;
  &:hover {
   background-color: rgba(0, 0, 0, 0.1);
  }
 }
`;

const Navigation = ({ history }) => {
 const dispatch = useDispatch();
 const permission = useSelector(state => state.auth.user.permission);
 const newOrder = useSelector(state => state.newOrder);
 const [isNewOrder, setIsNewOrder] = useState(false);

 // HANDLERS
 const handleNewOrder = () => {
  if (
   newOrder.color ||
   newOrder.millingSymbol ||
   newOrder.handleSymbol1 ||
   newOrder.handleSymbol2 ||
   newOrder.veneerSymbol ||
   newOrder.items.length !== 0
  ) {
   setIsNewOrder(true);
  } else {
   history.push('/orderform');
  }
 };
 const handleLogOut = () => {
  dispatch(logOutUser());
 };

 // CONDITIONAL DISPLAY
 let nav = <GuestNav />;
 if (permission === 'user')
  nav = <UserNav handleNewOrder={handleNewOrder} handleLogOut={handleLogOut} />;
 else if (permission === 'admin')
  nav = (
   <AdminNav handleNewOrder={handleNewOrder} handleLogOut={handleLogOut} />
  );
 else if (permission === 'employee')
  nav = <EmployeeNav handleLogOut={handleLogOut} />;
 else if (permission === 'display')
  nav = <DisplayNav handleLogOut={handleLogOut} />;

 return (
  <>
   <Navbar bg="light" expand="xl" className="navigation-bar ">
    <Navbar.Brand>
     <NavLink to="/" exact className="nav-brand">
      <img
       src={logo}
       height="40"
       className="d-inline-block align-top"
       alt="Blow logo"
      />
     </NavLink>
    </Navbar.Brand>
    <Nav.Item>
     <OrderElements />
    </Nav.Item>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <StyledNav className="ml-auto justify-content-end">{nav}</StyledNav>
    </Navbar.Collapse>
   </Navbar>
   {/* MODALS */}
   {isNewOrder && <IsNewOrder closeModal={() => setIsNewOrder(false)} />}
  </>
 );
};

Navigation.propTypes = {
 history: PropTypes.object,
};

export default withRouter(Navigation);
