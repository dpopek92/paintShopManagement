import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";

const StyledWrapper = styled.div`
 text-align: center;
 margin: 5px 5px;
`;

const DataElement = ({ title, caption }) => {
 return (
  <StyledWrapper>
   <Heading>{title}</Heading>
   <p>{caption ? caption : ""}</p>
  </StyledWrapper>
 );
};

DataElement.propTypes = {
 title: PropTypes.string,
 caption: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DataElement;
