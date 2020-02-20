import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { NavDropdown, Nav } from "react-bootstrap";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Trash from "components/atoms/icons/Trash";
import {
 removeColor,
 removeGlassCase,
 removeHandle1,
 removeHandle2,
 removeMilling,
 removeVeneer
} from "actions/newOrder";

const StyledNavLink = styled(NavLink)`
 font-size: 12px;
 font-weight: bold !important;
 padding: 5px;
`;

const OrderElements = ({}) => {
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 const [isDisplayed, setIsDisplayed] = useState(false);
 const path = window.location.pathname;
 const {
  color,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
  veneerSymbol
 } = newOrder;

 useEffect(() => {
  if (
   color ||
   handleSymbol1 ||
   handleSymbol2 ||
   millingSymbol ||
   glassCaseSymbol ||
   veneerSymbol
  ) {
   if (!path.includes("orderform") && !path.includes("edit")) {
    setIsDisplayed(true);
   } else {
    setIsDisplayed(false);
   }
  } else {
   setIsDisplayed(false);
  }
 }, [
  color,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
  veneerSymbol,
  path
 ]);

 return (
  <>
   {isDisplayed && (
    <>
     <NavDropdown
      title={<FontAwesomeIcon icon={faBoxOpen} style={{ fontSize: 20 }} />}
      id="basic-nav-dropdown"
     >
      {color && (
       <Nav.Item>
        <p style={{ fontSize: 14, margin: 2 }}>
         <Trash onclick={() => dispatch(removeColor())} />
         <strong> Kolor: </strong>
         {color}
        </p>
       </Nav.Item>
      )}
      {handleSymbol1 && (
       <Nav.Item>
        <p style={{ fontSize: 14, margin: 2 }}>
         <Trash onclick={() => dispatch(removeHandle1())} />
         <strong> Uchwyt (1): </strong>
         {handleSymbol1}
        </p>
       </Nav.Item>
      )}
      {handleSymbol2 && (
       <Nav.Item>
        <p style={{ fontSize: 14, margin: 2 }}>
         <Trash onclick={() => dispatch(removeHandle2())} />
         <strong> Uchwyt (2): </strong>
         {handleSymbol2}
        </p>
       </Nav.Item>
      )}
      {millingSymbol && (
       <Nav.Item>
        <p style={{ fontSize: 14, margin: 2 }}>
         <Trash onclick={() => dispatch(removeMilling())} />
         <strong> Wzór frezowania: </strong>
         {millingSymbol}
        </p>
       </Nav.Item>
      )}
      {glassCaseSymbol && (
       <Nav.Item>
        <p style={{ fontSize: 14, margin: 2 }}>
         <Trash onclick={() => dispatch(removeGlassCase())} />
         <strong> Wzór witryny: </strong>
         {glassCaseSymbol}
        </p>
       </Nav.Item>
      )}
      {veneerSymbol && (
       <Nav.Item>
        <p style={{ fontSize: 14, margin: 2 }}>
         <Trash onclick={() => dispatch(removeVeneer())} />
         <strong> Wzór forniru: </strong>
         {veneerSymbol}
        </p>
       </Nav.Item>
      )}

      <NavDropdown.Divider />
      <StyledNavLink to="/orderform" exact className="dropdown-link nav-link">
       Przejdź do zamówienia
      </StyledNavLink>
     </NavDropdown>
    </>
   )}
  </>
 );
};

export default OrderElements;
