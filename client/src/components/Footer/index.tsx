import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
 position: absolute;
 bottom: 0;
 left: 50%;
 transform: translateX(-50%);
`;

const Footer = () => {
 return (
  <StyledWrapper>
   <small>stopka</small>
  </StyledWrapper>
 );
};

export default Footer;
