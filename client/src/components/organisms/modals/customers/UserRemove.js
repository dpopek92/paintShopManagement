import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { userRemove } from "utils/apiHandlers/customers/delete";

const UserRemove = ({ closeModal, userId, history }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleUserRemove = async () => {
  dispatch(setSpinner(true));
  await userRemove(userId, () => {
   dispatch(setSpinner(false));
   history.push("/customers");
  });
 };

 return (
  <Modal closeModal={closeModal} variant="danger" title="Usuń użytkownika">
   <p>
    Czy na pewno chcesz usunąć tego użytkownika i jego zamówienia z bazy danych?
   </p>
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handleUserRemove}>
     Tak
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Nie
    </Button>
   </Buttons>
  </Modal>
 );
};

UserRemove.propTypes = {
 userId: PropTypes.string,
 closeModal: PropTypes.func
};

export default withRouter(UserRemove);
