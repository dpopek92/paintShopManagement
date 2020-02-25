import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../authTemplate';

const StyledWrapper = styled.div`
 padding: 0 20px 0 20px;
 @media (max-width: 768px) {
  padding: 20px 10px 0 10px;
 }
`;

const FullWidthPageTemplate: React.FC = ({ children }) => {
 return (
  <PageTemplate>
   <StyledWrapper>{children}</StyledWrapper>
  </PageTemplate>
 );
};

export default FullWidthPageTemplate;
