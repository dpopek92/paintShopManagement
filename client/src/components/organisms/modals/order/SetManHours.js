import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Buttons from 'templates/FlexRowTemplate';
import { setSpinner } from 'actions/view';
import { getOrder } from 'actions/orders';
import { changeManHours } from 'utils/apiHandlers/orders/update';

const SetManHours = ({ closeModal, order }) => {
 const dispatch = useDispatch();
 const [manHours, setManHours] = useState('');

 const handleInput = e => {
  const { value } = e.target;
  const numbers = /^[\d]*$/;
  if (!value.match(numbers)) return;
  const hours = parseInt(value, 10);
  setManHours(hours);
 };

 const handleSubmit = async () => {
  console.log(manHours);
  dispatch(setSpinner(true));
  await changeManHours(order._id, manHours, () => {
   dispatch(getOrder(order._id, () => dispatch(setSpinner(false)), null));
   closeModal();
  });
 };

 return (
  <Modal closeModal={closeModal} title="Dodaj roboczogodziny">
   Aktualna ilość roboczogodzin wynosi:{' '}
   <strong>{order.manHours.hours ? order.manHours.hours : '0'}</strong> h.
   <br />
   Chcesz zmienić na:{' '}
   <Form.Control
    type="text"
    placeholder="ilość godzin"
    style={{ width: '30%', display: 'inline' }}
    value={manHours}
    onChange={handleInput}
   />
   <hr />
   <Buttons justify="flex-end">
    <Button variant="success" onClick={handleSubmit}>
     Zmień
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Buttons>
  </Modal>
 );
};

SetManHours.propTypes = {};

export default SetManHours;
