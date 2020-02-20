import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PageTemplate from "./PageTemplate";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";

const StyledWrapper = styled.div`
 padding: 20px 20px 0 20px;
 @media (max-width: 768px) {
  padding: 20px 10px 0 10px;
 }
`;

const FullWidthPageTemplate = ({ title, children }) => {
 return (
  <PageTemplate>
   <StyledWrapper>
    {title && <Heading>{title}</Heading>}
    {children}
   </StyledWrapper>
  </PageTemplate>
 );
};

FullWidthPageTemplate.propTypes = {
 title: PropTypes.string,
 children: PropTypes.element
};

export default FullWidthPageTemplate;
