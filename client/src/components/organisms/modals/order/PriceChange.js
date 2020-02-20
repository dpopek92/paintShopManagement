import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Modal from 'components/molecules/modal/Modal';
import Buttons from 'templates/FlexRowTemplate';
import { setSpinner } from 'actions/view';
import { getOrder } from 'actions/orders';
import { changePrice } from 'utils/apiHandlers/orders/update';

const PriceChange = ({ closeModal, order }) => {
 const [price, setPrice] = useState('');
 const dispatch = useDispatch();

 const handleInput = e => {
  const { value } = e.target;
  const numbers = /^[\d|.|,]*$/;
  if (!value.match(numbers)) return;
  setPrice(value);
 };

 const handleSubmit = async (orderId, newPrice) => {
  dispatch(setSpinner(true));
  await changePrice(orderId, newPrice);
  await dispatch(getOrder(orderId, () => dispatch(setSpinner(false)), null));
  closeModal();
 };

 //  console.log(price);
 return (
  <Modal closeModal={closeModal} title="Zmiana ceny" variant="success">
   <>
    Aktualna cena lakierowania zamówienia Wynosi:{' '}
    <strong>{order.price && order.price.toFixed(2)}</strong> zł.
    <br />
    Chcesz ją zmienić na:{' '}
    <Form.Control
     type="text"
     placeholder="kwota"
     style={{ width: '30%', display: 'inline' }}
     value={price}
     onChange={handleInput}
    />
    <br />
    {order.manHours && order.manHours.price && (
     <small>
      Do ceny zostanie dodane:{' '}
      <strong>{order.manHours.price.toFixed(2)}</strong>zł za{' '}
      <strong>{order.manHours.hours}</strong>h prac stolarskich.
     </small>
    )}
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      onClick={() => {
       handleSubmit(order._id, price);
      }}
     >
      Zmień
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

PriceChange.propTypes = {
 closeModal: PropTypes.func,
 order: PropTypes.instanceOf(Object),
};

export default PriceChange;
