import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";

const AddOrderSuccess = ({ closeModal }) => {
 const activeOrderType = useSelector(state => state.newOrder.activeOrderType);
 return (
  <Modal closeModal={closeModal} title="Zakończono">
   {activeOrderType === "New" ? (
    <p>
     Zamówienie zostało złożone. O zmianie statusu zostaniesz poinformowany
     drogą mailową.
    </p>
   ) : (
    <p>Zamówienie zostało zaktualizowane</p>
   )}
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={closeModal}>
     Zakończ
    </Button>
   </Buttons>
  </Modal>
 );
};

AddOrderSuccess.propTypes = {};

export default AddOrderSuccess;
