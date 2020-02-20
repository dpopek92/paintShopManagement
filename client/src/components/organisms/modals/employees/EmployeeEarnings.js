import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/molecules/modal/Modal';
import Row from 'templates/FlexRowTemplate';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setSpinner } from 'actions/view';
import { loadEmployee } from 'actions/employees';
import { signal } from 'const';
import { setEmployeeEarnings } from 'utils/apiHandlers/employees/update';

const EmployeeEarnings = ({ closeModal, employeeId }) => {
 const dispatch = useDispatch();
 const employee = useSelector(state => state.employees.employee);
 const [earnings, setEarnings] = useState(employee.earnings);

 // HANDLERS
 const handleEmployeeEarnings = async () => {
  dispatch(setSpinner(true));
  await setEmployeeEarnings(employeeId, earnings, () => {
   dispatch(
    loadEmployee(
     employeeId,
     () => {
      dispatch(setSpinner(false));
      closeModal();
     },
     signal.token,
    ),
   );
  });
 };
 const handleInput = e => {
  const { value } = e.target;
  const numbers = /^[\d|.|,]*$/;
  if (!value.match(numbers)) return;
  const text = value.replace(',', '.');
  setEarnings(text);
 };
 return (
  <Modal closeModal={closeModal} title="Ustaw wynagrodzenie">
   {employee && (
    <>
     {' '}
     <Row justify="space-between">
      <Heading>Stawka godzinowa:</Heading>{' '}
      <Form.Control
       type="text"
       placeholder="Kwota"
       style={{ width: 70 }}
       value={earnings}
       onChange={handleInput}
      />
     </Row>
     <hr />
     <Row justify="flex-end">
      <Button variant="success" onClick={handleEmployeeEarnings}>
       Zatwierdź
      </Button>
      <Button variant="danger" onClick={closeModal}>
       Anuluj
      </Button>
     </Row>
    </>
   )}
  </Modal>
 );
};

EmployeeEarnings.propTypes = {
 closeModal: PropTypes.func,
 employeeId: PropTypes.string,
};

export default EmployeeEarnings;
