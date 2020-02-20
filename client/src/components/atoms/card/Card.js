import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledCard = styled.div`
 margin: 10px 0;
 padding: 40px 20px;
 border-radius: 5px;
 border: 1px solid rgba(0, 0, 0, 0.125);
`;

const Card = ({ children }) => {
 return <StyledCard>{children}</StyledCard>;
};

Card.propTypes = {};

export default Card;
