import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";

const StyledParagraph = styled.p`
 font-weight: bold;
 margin-bottom: 5px;
`;

const Errors = ({ closeModal, errors }) => {
 return (
  <Modal closeModal={closeModal} title="Wypełnij te pola" variant="danger">
   {errors.map(item => (
    <StyledParagraph key={item}>{item}</StyledParagraph>
   ))}
   <hr />
   <Buttons justify="flex-end">
    <Button onClick={closeModal} variant="danger">
     Zamknij
    </Button>
   </Buttons>
  </Modal>
 );
};

Errors.propTypes = {
 closeModal: PropTypes.func,
 errors: PropTypes.array
};

export default Errors;
