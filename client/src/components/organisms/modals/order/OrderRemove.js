import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { orderRemove } from "utils/apiHandlers/orders/delete";

const OrderRemove = ({ closeModal, order, history }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleDeleteOrder = async () => {
  dispatch(setSpinner(true));
  await orderRemove(
   order._id,
   () => {
    dispatch(setSpinner(false));
    history.push("/");
    closeModal();
   },
   () => {
    dispatch(setSpinner(false));
    closeModal();
   }
  );
 };

 return (
  <Modal closeModal={closeModal} title={"Usuń zamówienie"} variant="danger">
   <>
    <p>
     Zamówienie ma status:{" "}
     <strong>
      {order.productionStatus ? order.productionStatus : order.status}
     </strong>
     , czy na pewno chcesz je usunąć?
    </p>
    <hr />
    <Buttons justify="flex-end">
     <Button variant="success" onClick={handleDeleteOrder}>
      Tak
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Nie
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

OrderRemove.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default withRouter(OrderRemove);
