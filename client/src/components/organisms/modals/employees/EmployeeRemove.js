import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Modal from "components/molecules/modal/Modal";
import Buttons from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { employeeRemove } from "utils/apiHandlers/employees/delete";

const EmployeeRemove = ({ closeModal, employeeId, history }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleEmployeeRemove = async () => {
  dispatch(setSpinner(true));
  await employeeRemove(employeeId, () => {
   dispatch(setSpinner(false));
   history.push("/employees");
  });
 };

 return (
  <Modal variant="danger" closeModal={closeModal} title="Usuń pracownika">
   <p>Czy na pewno chcesz usunąc tego pracownika z bazy danych?</p>
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handleEmployeeRemove}>
     Tak
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Nie
    </Button>
   </Buttons>
  </Modal>
 );
};

EmployeeRemove.propTypes = {
 closeModal: PropTypes.func,
 employeeId: PropTypes.string
};

export default withRouter(EmployeeRemove);
