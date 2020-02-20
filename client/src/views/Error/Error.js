import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
 width: 100%;
 height: 100vh;
`;
const StyledContent = styled.div`
 text-align: center;
 position: absolute;
 top: 30%;
 left: 50%;
 transform: translate(-50%, -50%);
`;
const StyledHeader = styled.h1`
 color: ${({ theme }) => theme.blowGreen};
 font-size: 50px;
 letter-spacing: 5px;
`;

const ErrorPage = () => {
 return (
  <StyledWrapper>
   <StyledContent>
    <StyledHeader>Strona nie istnieje</StyledHeader>
    <Button as={Link} to="/">
     Wróć do strony głównej
    </Button>
   </StyledContent>
  </StyledWrapper>
 );
};

export default ErrorPage;
