/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Form, Button } from 'react-bootstrap';
import Buttons from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import { loadOrders } from 'actions/orders';
import { setOrderAsData, setNumber, addType } from 'actions/newOrder';
import { signal } from 'const';

const orderTypes = ['Nowe zamówienie', 'Domówienie', 'Poprawa (wina klienta)'];

const StyledHeading = styled.h6`
 font-weight: bold;
 margin-top: 10px;
`;
const types = ['Poprawa (wina klienta)', 'Domówienie'];

const OrderTypeChange = ({ closeModal }) => {
 const dispatch = useDispatch();
 const [orderType, setOrderType] = useState(null);
 const [orderNumber, setOrderNumber] = useState('');
 const [isButtonDisabled, setIsButtonDisabled] = useState(true);
 const orders = useSelector(state => state.orders.list);
 const user = useSelector(state => state.auth.user);

 // LOAD ORDERS
 useEffect(() => {
  dispatch(loadOrders(() => {}, signal.token));
 }, []);

 // CHECK IS BUTTON DISABLED
 useEffect(() => {
  if (!orderType) setIsButtonDisabled(true);
  else if (
   orderType !== 'Materiał klienta' &&
   orderType !== 'Nowe zamówienie' &&
   !orderNumber
  )
   setIsButtonDisabled(true);
  else setIsButtonDisabled(false);
 }, [orderType, orderNumber]);

 // HANDLERS
 const handleCurrentFreeUserNumber = () => {
  setOrderNumber(user.currentFreeOrderId);
 };
 const handleOrderType = e => {
  setOrderType(e.target.value);
  if (!types.includes(orderType)) handleCurrentFreeUserNumber();
  else setOrderNumber('');
 };
 const handleOrder = e => setOrderNumber(e.target.value);

 const handleSetData = async () => {
  // GET ORDER BASIC DATA
  if (types.includes(orderType)) {
   const order = await orders.find(item => item.number === orderNumber);

   dispatch(
    setOrderAsData(
     order.color,
     order.paintType,
     order.paintStyle,
     order.handleSymbol1,
     order.handleSymbol2,
     order.millingSymbol,
     order.veneerSymbol,
     order.glassCaseSymbol,
     order.isFlat,
     order.customMilling && order.customMilling.path,
    ),
   );
  }

  // SET ORDER NUMBER
  if (orderType === 'Poprawa (wina klienta)') {
   dispatch(setNumber(`${orderNumber}.P`));
  } else if (orderType === 'Reklamacja (wina BLOW)') {
   dispatch(setNumber(`${orderNumber}.R`));
  } else if (orderType === 'Domówienie') {
   dispatch(setNumber(`${orderNumber}.D`));
  } else {
   dispatch(setNumber(orderNumber));
  }

  dispatch(addType(orderType));
  closeModal();
 };
 return (
  <Modal title="Typ zamówienia" closeModal={closeModal}>
   <StyledHeading>Zmiana typu zamówienia</StyledHeading>
   <Form.Group onChange={handleOrderType} value={orderType}>
    <Form.Check
     custom
     value="Materiał klienta"
     type="radio"
     label="Materiał własny"
     id="Materiał klienta"
     name="orderType"
    />
    {orderTypes.map(item => (
     <Form.Check
      custom
      key={item}
      value={item}
      type="radio"
      label={item}
      id={item}
      name="orderType"
     />
    ))}
   </Form.Group>
   {orderType &&
    orderType !== 'Materiał klienta' &&
    orderType !== 'Nowe zamówienie' && (
     <Fade>
      <StyledHeading>Zamówienia</StyledHeading>
      <Form.Control
       as="select"
       disabled={!orders}
       onChange={handleOrder}
       value={orderNumber}
      >
       <option value="" />
       {orders &&
        orders.map(order => {
         const { _id, number } = order;
         if (!number.includes('.')) {
          return (
           <option key={_id} value={number}>
            {number}
           </option>
          );
         }
         return null;
        })}
      </Form.Control>
     </Fade>
    )}
   <hr />
   <Buttons justify="flex-end">
    <Button
     variant="success"
     disabled={isButtonDisabled}
     onClick={handleSetData}
    >
     Wybierz
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Buttons>
  </Modal>
 );
};

OrderTypeChange.propTypes = { closeModal: PropTypes.func };

export default OrderTypeChange;
