import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import { clearOrder, setNumber } from "actions/newOrder";

const IsNewOrder = ({ closeModal, history }) => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);

 // HANDLERS
 const handleNewOrder = () => {
  dispatch(clearOrder());
  dispatch(setNumber(user.currentFreeOrderId));
  history.push("/orderform");
  closeModal();
 };
 const handleKeepValues = () => {
  history.push("/orderform");
  closeModal();
 };
 return (
  <Modal closeModal={closeModal} title="Nowe zamówienie">
   <>
    <p>
     Czy chcesz usunąc wybrane parametry i rozpoczać do pustego formularza?
    </p>
    <hr />
    <Buttons justify="flex-end">
     <Button variant="success" onClick={handleNewOrder}>
      Tak
     </Button>
     <Button variant="danger" onClick={handleKeepValues}>
      Nie
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

IsNewOrder.propTypes = {
 closeModal: PropTypes.func
};

export default withRouter(IsNewOrder);
