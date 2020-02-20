import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import OrderTemplate from 'templates/OrderTemplate';
import AddOrderSuccess from 'components/organisms/modals/orderForm/AddOrderSuccess';
import { setSpinner } from 'actions/view';
import { setPrice, setNumberOfElements, clearOrder } from 'actions/newOrder';
import { postOrder } from 'utils/apiHandlers/orders/post';

const StyledButton = styled(Button)`
 margin: 0px 40px;
 font-size: 20px;
 letter-spacing: 3px;
 padding: 5px 40px;
`;

const OrderSummary = ({ history }) => {
 const dispatch = useDispatch();
 const order = useSelector(state => state.newOrder);
 const [orderId, setOrderId] = useState(null);
 const [isSuccess, setIsSuccess] = useState(false);

 // CALCULATE ORDER & GET PRICE
 useEffect(() => {
  dispatch(setSpinner(true));
  // calcValues
  //   dispatch(calculateOrder());
  dispatch(setNumberOfElements());
  // calcPrice
  dispatch(
   setPrice(
    {
     byUser: order.user,
     orderType: order.orderType,
     paintType: order.paintType,
     paintStyle: order.paintStyle,
     isFlat: order.isFlat,
     surfaceRight: order.surfaceRight,
     surfaceLeft: order.surfaceLeft,
     handleSymbol1: order.handleSymbol1,
     handleSymbol2: order.handleSymbol2,
     chamfering: order.chamfering,
     backMilling: order.backMilling,
     milledHandle: order.milledHandle,
     milledPartHandle: order.milledPartHandle,
     hingesHoles: order.hingesHoles,
     veneerSymbol: order.veneerSymbol,
     color: order.color,
     items: order.items,
    },
    () => dispatch(setSpinner(false)),
    () => {},
    () => {},
   ),
  );
 }, []);

 if (order.items.length === 0) {
  return <Redirect to="/orderform" />;
 }

 // HANDLERS
 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  const id = await postOrder(order, order.activeOrderType);
  if (id) {
   dispatch(setSpinner(false));
   setOrderId(id);
   setIsSuccess(true);
  }
 };
 const handleCloseModal = () => {
  setIsSuccess(false);
  dispatch(clearOrder());
  history.push(`/order/${orderId}`);
 };

 return (
  <>
   <OrderTemplate order={order} />
   <StyledButton variant="success" onClick={handleSubmit}>
    Wyślij
   </StyledButton>
   {/* MODALS */}
   {isSuccess && <AddOrderSuccess closeModal={handleCloseModal} />}
  </>
 );
};

// OrderSummary.propTypes = {};

export default withRouter(OrderSummary);
