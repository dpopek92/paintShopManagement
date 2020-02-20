import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: center;
 flex-wrap: wrap;
`;

const FlexTemplate = ({ children }) => {
 return <StyledWrapper>{children}</StyledWrapper>;
};

FlexTemplate.propTypes = {};

export default FlexTemplate;
