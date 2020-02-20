import React, { useState } from "react";
import QrReader from "react-qr-reader";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";
import Modal from "components/molecules/modal/Modal";

const ScanOrder = ({ closeModal, history, radnom }) => {
 const validateRegEx = new RegExp("^[0-9a-fA-F]{24}$");
 const [error, setError] = useState("");

 // HANDLERS
 const handleScan = orderId => {
  closeModal();
  history.push(`/order/${orderId}`);
 };
 return (
  <Modal closeModal={closeModal} title="Zeskanuj kod">
   {!error ? (
    <QrReader
     delay={500}
     style={{ width: "100%" }}
     onError={error => {
      if (error) {
       setError(`${error}`);
      }
     }}
     onScan={data => {
      console.log(data);
      if (data && validateRegEx.test(data)) {
       handleScan(data);
      }
     }}
    />
   ) : (
    <Heading>{error}</Heading>
   )}
   <hr />
   <Buttons justify="flex-end">
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Buttons>
  </Modal>
 );
};

ScanOrder.propTypes = {
 closeModal: PropTypes.func
};

export default withRouter(ScanOrder);
