import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: ${({ column }) => (column ? 'column' : 'row')};
 flex-wrap: wrap;
 justify-content: ${({ justify }) => justify};
 button {
  margin: 5px 5px 10px 5px;
  padding: ${({ column }) => (column ? '10px' : '5px')} 30px;
 }
 @media (max-width: 600px) {
  flex-direction: column;
  justify-content: 'center';
  button {
   width: 100%;
   margin: 10px 0;
  }
 }
`;

const ButtonsRowTemplate = ({ children, justify = 'center', column }) => {
 return (
  <StyledWrapper justify={justify} column={column}>
   {children}
  </StyledWrapper>
 );
};

export default ButtonsRowTemplate;
