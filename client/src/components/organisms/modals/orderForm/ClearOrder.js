import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { clearOrder, setNumber } from "actions/newOrder";

const ClearOrder = ({ closeModal }) => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);

 const handleClear = () => {
  dispatch(clearOrder());
  dispatch(setNumber(user.currentFreeOrderId));
  closeModal();
 };

 return (
  <Modal closeModal={closeModal} variant="danger" title="Wyczyść">
   <p>Czy na pewno chcesz usunać wszystkie parametry zamówienia?</p>
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handleClear}>
     Usuń
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Buttons>
  </Modal>
 );
};

ClearOrder.propTypes = {
 closeModal: PropTypes.func
};

export default ClearOrder;
