import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import { setSpinner } from "actions/view";
import { startOrder } from "utils/apiHandlers/orders/update";
import { getOrder } from "actions/orders";
import { signal } from "const";

const StartOrder = ({ order, closeModal }) => {
 const dispatch = useDispatch();
 const position = useSelector(state => state.employee.activePosition);
 // HANDLERS
 const handleClick = async () => {
  dispatch(setSpinner(true));
  await startOrder(order._id, position, () => {
   dispatch(
    getOrder(
     order._id,
     () => {
      dispatch(setSpinner(false));
      closeModal();
     },
     signal.token
    )
   );
  });
 };
 return (
  <Modal closeModal={closeModal} title="Rozpoczęcie zamówienia">
   <p>Czy chcesz rozpocząć zamówienie?</p>

   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handleClick}>
     Tak
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Nie
    </Button>
   </Buttons>
  </Modal>
 );
};

StartOrder.propTypes = {
 order: PropTypes.object,
 closeModal: PropTypes.func
};

export default StartOrder;
