import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
 display: flex;
 justify-content: flex-start;
`;
const StyledWrapper = styled.div`
 margin-right: 20px;
 display: flex;
 h6,
 h4 {
  font-weight: bold;
  margin: 0;
  span {
   font-weight: normal;
  }
 }
`;

const Summary = ({ orders }) => {
 const [values, setValues] = useState({
  CNC: 0,
  PL: 0,
  PP: 0,
  elements: 0,
  SUM: 0,
 });
 useEffect(() => {
  if (orders.length) {
   const CNC = orders.reduce((acc, order) => acc + order.surfaceCNC, 0);
   const PL = orders.reduce((acc, order) => acc + order.surfaceRight, 0);
   const PP = orders.reduce((acc, order) => acc + order.surfaceLeft, 0);
   const elements = orders.reduce((acc, order) => acc + order.elements, 0);
   const SUM = PL + PP;
   if (CNC !== values.CNC || PL !== values.PL || PP !== values.PP) {
    setValues({ CNC, PL, PP, elements, SUM });
   }
  }
 }, [orders.length]);

 return orders.length ? (
  <StyledContainer>
   <StyledWrapper>
    <h6>
     Elementy:{' '}
     <span>
      {values.elements || 0} <small>szt</small>
     </span>
    </h6>
   </StyledWrapper>
   <StyledWrapper>
    <h6>
     CNC:{' '}
     <span>
      {values.CNC ? values.CNC.toFixed(2) : 0}{' '}
      <small>
       m<sup>2</sup>
      </small>
     </span>
    </h6>
   </StyledWrapper>
   <StyledWrapper>
    <h6>
     PL:{' '}
     <span>
      {values.PL ? values.PL.toFixed(2) : 0}{' '}
      <small>
       m<sup>2</sup>
      </small>
     </span>
    </h6>
   </StyledWrapper>
   <StyledWrapper>
    <h6>
     PP:{' '}
     <span>
      {values.PP ? values.PP.toFixed(2) : 0}{' '}
      <small>
       m<sup>2</sup>
      </small>
     </span>
    </h6>
   </StyledWrapper>

   <StyledWrapper>
    <h4>
     SUMA:{' '}
     <span>
      {values.SUM ? values.SUM.toFixed(2) : 0}{' '}
      <small>
       m<sup>2</sup>
      </small>
     </span>
    </h4>
   </StyledWrapper>
  </StyledContainer>
 ) : null;
};

Summary.propTypes = {};

export default Summary;
