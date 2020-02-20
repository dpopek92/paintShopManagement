import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import withContext from 'hoc/withContext';
import Row from 'templates/FlexRowTemplate';
import OrderFormTemplate from 'templates/OrderFormTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Data from 'components/organisms/orderForm/OrderData';
import Elements from 'components/organisms/orderForm/OrderElements';
import Informations from 'components/organisms/orderForm/OrderInfo';
import Items from 'components/organisms/orderForm/OrderItems';
import OrderAs from 'components/organisms/modals/orderForm/OrderAs';
import OrderTypeChange from 'components/organisms/modals/orderForm/OrderTypeChange';
import Errors from 'components/organisms/modals/orderForm/Errors';
import { currentDate, signal } from 'const';
import {
 setNumber,
 setFinishDate,
 setActiveOrderType,
 calculateOrder,
} from 'actions/newOrder';
import { loadGlobalSettings } from 'actions/settings';
import ImportDataFromSheet from 'components/organisms/modals/orderForm/ImportDataFromSheet';

const OrderForm = ({ permissionContext, history }) => {
 const scrollTo = useRef(null);
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 const newOrder = useSelector(state => state.newOrder);
 const terms = useSelector(state => state.settings.finishTerm);
 const customers = useSelector(state => state.customers.list);
 const [isOrderAs, setIsOrderAs] = useState(false);
 const [isOrderTypeChange, setIsOrderTypeChange] = useState(false);
 const [isImport, setIsImport] = useState(false);
 const [errors, setErrors] = useState([]);
 const [customer, setCustomer] = useState('');

 //  console.log('Numer: ', newOrder.number);

 const {
  number,
  finishDate,
  color,
  glassCaseSymbol,
  millingSymbol,
  veneerSymbol,
  paintType,
  orderType,
 } = newOrder;

 // SET CUSTOMER
 useEffect(() => {
  if (newOrder.user && customers) {
   customers.forEach(item => {
    if (item._id === newOrder.user) {
     return setCustomer(`${item.company} - ${item.firstname}`);
    }
   });
  } else if (user.firstname) {
   setCustomer(`${user.company} - ${user.firstname}`);
   dispatch(setNumber(user.currentFreeOrderId));
  }
 }, [user, newOrder.user]);

 // GET TERMS TO CALC FINISH DATE
 useEffect(() => {
  dispatch(setActiveOrderType('New'));
  if (!terms) dispatch(loadGlobalSettings(() => {}, signal.token));
 }, []);

 // CALC FINISH DATE
 useEffect(() => {
  if (terms)
   dispatch(
    setFinishDate(
     terms.dateGloss,
     terms.dateSemigloss,
     terms.dateMilling,
     terms.dateVeneer,
    ),
   );
 }, [terms, color, glassCaseSymbol, millingSymbol, veneerSymbol, paintType]);

 // HANDLERS
 const scrollToBottom = () => {
  setTimeout(() => {
   scrollTo.current.scrollIntoView({ behavior: 'smooth' });
  }, 200);
 };

 const handleSummaryButton = () => {
  // validate
  const errorsArr = [];
  newOrder.items.forEach((item, index) => {
   if (!item.height) errorsArr.push(`Pozycja ${index + 1}: wysokość`);
   if (!item.width) errorsArr.push(`Pozycja ${index + 1}: szerokość`);
   if (!item.quantity) errorsArr.push(`Pozycja ${index + 1}: ilość`);
  });
  if (errorsArr.length !== 0) setErrors(errorsArr);
  else {
   dispatch(calculateOrder());
   history.push('orderform/summary');
  }
  // go to summary
 };

 return (
  <>
   <div>
    <OrderFormTemplate>
     <>
      <Row justify="space-between">
       <Heading>Formularz zamówienia</Heading>
       <div>
        {permissionContext === 'admin' && (
         <Button variant="outline-primary" onClick={() => setIsOrderAs(true)}>
          Zamów jako
         </Button>
        )}
        {permissionContext === 'user' && (
         <Button
          variant="outline-primary"
          onClick={() => setIsOrderTypeChange(true)}
         >
          Typ zamówienia
         </Button>
        )}
       </div>
      </Row>
      <Data
       customer={customer}
       number={number}
       currentDate={currentDate}
       finishDate={finishDate}
       orderType={orderType}
      />
      <Elements />
      <Informations />
      <Items
       scrollToBottom={scrollToBottom}
       handleSummaryButton={handleSummaryButton}
       setIsImport={setIsImport}
      />
      <div ref={scrollTo} />
     </>
    </OrderFormTemplate>
   </div>
   {/* MODALS */}
   {isOrderAs && <OrderAs closeModal={() => setIsOrderAs(false)} />}
   {isOrderTypeChange && (
    <OrderTypeChange closeModal={() => setIsOrderTypeChange(false)} />
   )}
   {errors.length !== 0 && (
    <Errors closeModal={() => setErrors([])} errors={errors} />
   )}
   {isImport && <ImportDataFromSheet closeModal={() => setIsImport(false)} />}
  </>
 );
};

OrderForm.propTypes = {
 permissionContext: PropTypes.string,
};

export default withRouter(withContext(OrderForm));
