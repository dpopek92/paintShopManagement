import React, { useState, useRef } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import OrderFormTemplate from 'templates/OrderFormTemplate';
import Row from 'templates/FlexRowTemplate';
import Data from 'components/organisms/orderForm/OrderData';
import Elements from 'components/organisms/orderForm/OrderElements';
import Informations from 'components/organisms/orderForm/OrderInfo';
import Items from 'components/organisms/orderForm/OrderItems';
import Errors from 'components/organisms/modals/orderForm/Errors';
import OrderTypeChange from 'components/organisms/modals/orderForm/editOrder/OrderTypeChange';
import { calculateOrder } from 'actions/newOrder';

const EditOrderForm = ({ history, match }) => {
 const scrollTo = useRef(null);
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 const [errors, setErrors] = useState([]);
 const [isTypeChange, setIsTypeChange] = useState(false);

 const { number, finishDate, date, orderType, user } = newOrder;

 if (!newOrder.user) {
  return <Redirect to={`/order/${match.params.id}`} />;
 }

 // HANDLERS
 const handleTypeChange = () => setIsTypeChange(true);
 const scrollToBottom = () => {
  setTimeout(() => {
   scrollTo.current.scrollIntoView({ behavior: 'smooth' });
  }, 200);
 };
 const handleSummaryButton = () => {
  const errorsArr = [];
  newOrder.items.forEach((item, index) => {
   if (!item.height) errorsArr.push(`Pozycja ${index + 1}: wysokość`);
   if (!item.width) errorsArr.push(`Pozycja ${index + 1}: szerokość`);
   if (!item.quantity) errorsArr.push(`Pozycja ${index + 1}: ilość`);
  });
  if (errorsArr.length !== 0) setErrors(errorsArr);
  else {
   dispatch(calculateOrder());
   history.push('/orderform/summary');
  }
 };

 return (
  <>
   <OrderFormTemplate>
    <>
     <Row justify="space-between">
      <Heading>Edycja zamówienia</Heading>
      <div>
       <Button variant="outline-primary" onClick={handleTypeChange}>
        Zmień typ zamówienia
       </Button>
      </div>
     </Row>
     <Data
      customer={`${user.company} - ${user.firstname}`}
      number={number}
      currentDate={new Date(date)}
      finishDate={new Date(finishDate)}
      orderType={orderType}
     />
     <Elements />
     <Informations />
     <Items
      scrollToBottom={scrollToBottom}
      handleSummaryButton={handleSummaryButton}
     />
     <div ref={scrollTo} />
    </>
   </OrderFormTemplate>
   {/* MODALS */}
   {errors.length !== 0 && (
    <Errors closeModal={() => setErrors([])} errors={errors} />
   )}
   {isTypeChange && (
    <OrderTypeChange closeModal={() => setIsTypeChange(false)} />
   )}
  </>
 );
};

// EditOrderForm.propTypes = {};

export default withRouter(EditOrderForm);
