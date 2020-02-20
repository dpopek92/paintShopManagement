import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal } from "react-bootstrap";

const StyledTitle = styled.h3`
 color: ${({ variant, theme }) => {
  if (variant === "success") return theme.blowGreen;
  if (variant === "danger") return theme.blowDanger;
 }};
`;

const ModalWrapper = ({
 title = "",
 closeModal,
 children,
 variant = "success",
 size = "xs"
}) => {
 return (
  <div>
   <Modal show={true} onHide={closeModal} size={size}>
    <Modal.Header closeButton>
     <Modal.Title>
      <StyledTitle variant={variant}>{title}</StyledTitle>
     </Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
   </Modal>
  </div>
 );
};

Element.propTypes = {
 title: PropTypes.string,
 closeModal: PropTypes.func,
 children: PropTypes.element,
 variant: PropTypes.string,
 size: PropTypes.string
};

export default ModalWrapper;
