/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Form, Button } from 'react-bootstrap';
import Buttons from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import Select from 'components/atoms/select/CustomersSelect';
import { signal, orderTypes, reasonsOfComplaint } from 'const';
import { loadCustomers, loadCustomerOrders } from 'actions/customers';
import {
 setOrderAsData,
 setNumber,
 addType,
 addUser,
 setReasonOfComplaint,
} from 'actions/newOrder';

const StyledHeading = styled.h6`
 font-weight: bold;
 margin-top: 10px;
`;

const types = [
 'Reklamacja (wina BLOW)',
 'Poprawa (wina klienta)',
 'Domówienie',
];

const OrderAs = ({ closeModal }) => {
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);
 const orders = useSelector(state => state.customers.customerOrders);
 const [asUserId, setAsUserId] = useState('');
 const [orderType, setOrderType] = useState(null);
 const [orderNumber, setOrderNumber] = useState('');
 const [complaintReason, setComplaintReason] = useState('');
 // display
 const [isButtonDisabeld, setIsButtonDisabeld] = useState(true);
 console.log(complaintReason);
 console.log(orderNumber);
 console.log(!complaintReason);
 console.log(orderType === 'Reklamacja (wina BLOW)');
 // LOAD CUSTOMERS
 useEffect(() => {
  if (!customers) {
   dispatch(loadCustomers(() => {}, signal.token));
  }
 }, []);

 // LOAD CUSTOMER ORDERS
 useEffect(() => {
  if (asUserId) {
   dispatch(loadCustomerOrders(asUserId, () => {}, signal.token));
  }
 }, [asUserId]);

 // CHECK IS BUTTON DISABLED
 useEffect(() => {
  if (!asUserId || !orderType) return setIsButtonDisabeld(true);
  if (types.includes(orderType)) {
   if (orderType === 'Reklamacja (wina BLOW)' && !complaintReason)
    return setIsButtonDisabeld(true);
   if (!orderNumber) return setIsButtonDisabeld(true);
  }
  return setIsButtonDisabeld(false);
 }, [asUserId, orderType, orderNumber, complaintReason]);

 // HANDLERS
 const handleCurrentFreeUserNumber = () => {
  customers.forEach(item => {
   if (asUserId === item._id) {
    setOrderNumber(item.currentFreeOrderId);
   }
  });
 };
 const handleCustomer = e => {
  setAsUserId(e.target.value);
  if (!types.includes(orderType)) handleCurrentFreeUserNumber();
  else setOrderNumber('');
 };
 const handleOrderType = e => {
  setOrderType(e.target.value);
  if (!types.includes(e.target.value)) handleCurrentFreeUserNumber();
 };
 const handleOrder = e => setOrderNumber(e.target.value);
 const handleReasonsOfComplaint = e => setComplaintReason(e.target.value);
 const handleSetData = () => {
  // SET ORDER NUMBER
  if (orderType === 'Poprawa (wina klienta)') {
   dispatch(setNumber(`${orderNumber}.P`));
  } else if (orderType === 'Reklamacja (wina BLOW)') {
   dispatch(setNumber(`${orderNumber}.R`));
   dispatch(setReasonOfComplaint(complaintReason));
  } else if (orderType === 'Domówienie') {
   dispatch(setNumber(`${orderNumber}.D`));
  } else {
   dispatch(setNumber(orderNumber));
  }
  // GET ORDER BASIC DATA
  if (types.includes(orderType)) {
   let order;
   orders.forEach(item => {
    if (item.user._id === asUserId && item.number === orderNumber) {
     order = item;
    }
   });
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
  // SET USER ID & ORDER TYPE
  dispatch(addUser(asUserId));
  dispatch(addType(orderType));
  closeModal();
 };

 return (
  <Modal closeModal={closeModal} title="Zamów jako">
   <>
    <StyledHeading>Lista klientów</StyledHeading>
    <Select items={customers} value={asUserId} onchange={handleCustomer} />
    <StyledHeading>Typ zamówienia</StyledHeading>
    <Form.Group onChange={handleOrderType} value={orderType}>
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
    {asUserId && orders && types.includes(orderType) && (
     <Fade>
      <StyledHeading>Zamówienia</StyledHeading>
      <Form.Control as="select" onChange={handleOrder} value={orderNumber}>
       // eslint-disable-next-line react/self-closing-comp
       <option value="" />
       {orders.map(order => {
        if (!order.number.includes('.')) {
         return (
          <option key={order._id} value={order.number}>
           {order.number}
          </option>
         );
        }
        return null;
       })}
      </Form.Control>
     </Fade>
    )}
    {asUserId && orders && orderType === 'Reklamacja (wina BLOW)' && (
     <Fade>
      <StyledHeading>Przyczyna</StyledHeading>
      <Form.Control
       as="select"
       onChange={handleReasonsOfComplaint}
       value={complaintReason}
      >
       <option value="" />
       {reasonsOfComplaint.map(item => {
        const { type } = item;
        return (
         <option key={type} value={type}>
          {type}
         </option>
        );
       })}
      </Form.Control>
     </Fade>
    )}
    <hr />
    <Buttons justify="flex-end">
     <Button
      variant="success"
      disabled={isButtonDisabeld}
      onClick={handleSetData}
     >
      Wybierz
     </Button>
     <Button variant="danger" onClick={closeModal}>
      Anuluj
     </Button>
    </Buttons>
   </>
  </Modal>
 );
};

OrderAs.propTypes = { closeModal: PropTypes.func };

export default OrderAs;
