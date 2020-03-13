import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../authTemplate';

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: nowrap;
 @media (max-width: 768px) {
  flex-direction: column;
 }
`;
const StyledSidebar = styled.div`
 width: 300px;
 padding: 0 10px;
 position: fixed;
 @media (max-width: 768px) {
  position: relative;
  width: 100%;
 }
`;
const StyledContent = styled.div`
 width: 100%;
 padding: 0 20px;
 margin-left: 300px;
 @media (max-width: 768px) {
  margin-left: 0;
 }
`;

interface PropsT {
 sideComponent: JSX.Element | React.Component;
}

const WithSidebar: React.FC<PropsT> = ({ children, sideComponent }) => {
 return (
  <AuthTemplate>
   <StyledWrapper>
    <StyledSidebar>{sideComponent}</StyledSidebar>
    <StyledContent>{children}</StyledContent>
   </StyledWrapper>
  </AuthTemplate>
 );
};

export default WithSidebar;
