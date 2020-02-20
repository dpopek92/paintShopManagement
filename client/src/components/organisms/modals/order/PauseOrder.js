import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import EmployeesList from "components/molecules/employeesList/EmployeesListCheckboxes";
import { setSpinner } from "actions/view";
import { loadPositionEmployees } from "actions/employee";
import { pauseOrder } from "utils/apiHandlers/orders/update";
import { getOrder } from "actions/orders";
import { signal } from "const";

const PauseOrder = ({ closeModal, order }) => {
 const dispatch = useDispatch();
 const position = useSelector(state => state.employee.activePosition);
 const employees = useSelector(state => state.employee.employees);
 // toReq
 const [orderEmployees, setOrderEmployees] = useState([]);

 // GET POSITION EMPLOYEES
 useEffect(() => {
  dispatch(loadPositionEmployees(position, () => {}, signal.token));
 }, [position]);

 //HANLDERS
 const handlePause = async () => {
  dispatch(setSpinner(true));
  await pauseOrder(order._id, position, orderEmployees, () => {
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
 const handleCheck = e => {
  if (e.target.checked) {
   setOrderEmployees(orderEmployees.concat(e.target.value));
  } else {
   if (orderEmployees.includes(e.target.value)) {
    const newOrderEmployees = orderEmployees.filter(
     item => item !== e.target.value
    );
    setOrderEmployees(newOrderEmployees);
   }
  }
 };
 console.log(orderEmployees);
 return (
  <Modal closeModal={closeModal} title="Kto wykonywał zamówienie?">
   {employees && (
    <EmployeesList employees={employees} handleCheck={handleCheck} />
   )}
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handlePause}>
     Pauza
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Buttons>
  </Modal>
 );
};

PauseOrder.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.object
};

export default PauseOrder;
