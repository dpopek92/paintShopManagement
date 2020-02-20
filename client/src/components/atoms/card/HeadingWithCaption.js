import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
 text-align: center;
 margin: 0 5px;
`;
const StyledHeader = styled.h6`
 font-weight: bold;
 letter-spacing: 1px;
`;

const HeadingWithCaption = ({ title, caption }) => {
 return (
  <StyledWrapper>
   <StyledHeader>{title}</StyledHeader>
   <p>{caption ? caption : ""}</p>
  </StyledWrapper>
 );
};

HeadingWithCaption.propTypes = {};

export default HeadingWithCaption;
