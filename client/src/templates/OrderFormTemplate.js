import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Data from 'components/molecules/sidebar/OrderFormData';
import EdgeDescription from 'components/molecules/sidebar/EdgeDescription';
import FullWidthPageTemplate from './FullWidthPageTemplate';

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: nowrap;
 @media (max-width: 600px) {
  flex-direction: column;
 }
`;
const StyledSidebarWrapper = styled.div`
 width: 300px;
 padding: 0 10px;
 position: fixed;
 @media (max-width: 600px) {
  position: relative;
  width: 100%;
 }
`;
const StyledFormWrapper = styled.div`
 width: 100%;
 padding: 0 20px;
 margin-left: 300px;
 @media (max-width: 600px) {
  margin-left: 0;
 }
`;

const OrderFormTemplate = ({ children }) => {
 return (
  <FullWidthPageTemplate>
   <StyledWrapper>
    <StyledSidebarWrapper>
     <EdgeDescription />
     <hr />
     <Data />
    </StyledSidebarWrapper>
    <StyledFormWrapper>
     <>{children}</>
    </StyledFormWrapper>
   </StyledWrapper>
  </FullWidthPageTemplate>
 );
};

OrderFormTemplate.propTypes = {
 children: PropTypes.element,
};

export default OrderFormTemplate;
