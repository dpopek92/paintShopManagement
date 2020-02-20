import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { getOrder } from "actions/orders";
import { handlePaidStatus } from "utils/apiHandlers/orders/update";

const PaidStatus = ({ closeModal, order }) => {
 const dispatch = useDispatch();

 const handleSubmit = async (orderId, isPaid) => {
  dispatch(setSpinner(true));
  await handlePaidStatus(orderId, isPaid, () => {
   dispatch(getOrder(orderId, () => dispatch(setSpinner(false)), null));
  });
  closeModal();
 };

 return (
  <Modal
   closeModal={closeModal}
   title={"Zmiana statusu płatności"}
   variant="success"
  >
   <>
    <p>
     Zamówienie{" "}
     <strong>
      {order.user.company} - {order.user.firstname} - {order.number}
     </strong>{" "}
     jest:
    </p>
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      onClick={() => {
       handleSubmit(order._id, true);
      }}
     >
      Opłacone
     </Button>
     <Button
      variant="danger"
      onClick={() => {
       handleSubmit(order._id, false);
      }}
     >
      Nieopłacone
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

PaidStatus.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default PaidStatus;
