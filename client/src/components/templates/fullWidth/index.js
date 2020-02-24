import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageTemplate from '../authTemplate';

const StyledWrapper = styled.div`
 padding: 0 20px 0 20px;
 @media (max-width: 768px) {
  padding: 20px 10px 0 10px;
 }
`;

const FullWidthPageTemplate = ({ children }) => {
 return (
  <PageTemplate>
   <StyledWrapper>{children}</StyledWrapper>
  </PageTemplate>
 );
};

FullWidthPageTemplate.propTypes = {
 children: PropTypes.element,
};

export default FullWidthPageTemplate;
