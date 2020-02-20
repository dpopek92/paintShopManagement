import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import PageTemplate from 'templates/PageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import OrdersList from 'components/molecules/ordersList/static/List';
import { Button } from 'react-bootstrap';
import { setSpinner, setSortList } from 'actions/view';
import { getOrdersToPaintsOrder } from 'actions/orders';
import { isObjectEmpty } from 'utils/functions/objects';
import PaintsOrdersSummary from 'components/organisms/modals/paintsOrders/PaintsOrdersSummary';
import PlacedOrders from 'components/organisms/modals/paintsOrders/PlacedOrders';
import { useHistory } from 'react-router';
import {
 setSkippedOrder,
 setInitialPaintsOrders,
 setPaintsOrder,
} from 'actions/paintsOrder';

const PaintsOrder = () => {
 const history = useHistory();
 const dispatch = useDispatch();
 const orders = useSelector(state => state.orders.list);
 const sortOrders = useSelector(state => state.view.sortList.paintsOrder);
 const skippedOrders = useSelector(state => state.paintsOrder.skippedOrders);
 const paintsOrders = useSelector(state => state.paintsOrder.paintsOrders);

 // to req
 //  const [skippedOrders, setSkippedOrders] = useState([]);
 //  const [paintsOrders, setPaintsOrders] = useState({});

 // display
 const [isPlacedOrders, setIsPlacedOrders] = useState(false);
 const [isSummary, setIsSummary] = useState(false);

 // GET ORDERS
 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(getOrdersToPaintsOrder(() => dispatch(setSpinner(false))));
 }, []);

 useEffect(() => {
  if (orders && isObjectEmpty(paintsOrders)) {
   const newPaintsOrders = {};
   orders.forEach(item => {
    newPaintsOrders[item._id] = '';
   });
   dispatch(setInitialPaintsOrders(newPaintsOrders));
  }
 }, [orders]);

 // HANDLERS
 const handleSummary = () => setIsSummary(true);
 const handlePlacedOrders = () => setIsPlacedOrders(true);
 const handlePaintsOrderCheckbox = e => {
  const { value, checked } = e.target;
  if (checked) dispatch(setSkippedOrder(value, 'add'));
  else dispatch(setSkippedOrder(value, 'remove'));
 };
 const handlePaintsOrderInput = (e, id) => {
  const { value } = e.target;
  const numbers = /^[\d|.|,]*$/;
  if (!value.match(numbers)) return;
  dispatch(setPaintsOrder(id, value));
 };
 const handleSortOrders = sortBy => {
  dispatch(setSortList('paintsOrder', sortBy));
 };
 const handleRedirect = (e, id) => {
  const isNotClickable = e.target.getAttribute('data-notclickable');
  console.log(e.target.getAttribute('data-notclickable'));
  if (!isNotClickable) {
   history.push(`/order/${id}`);
  }
 };
 //  console.log(skippedOrders);
 //  console.log(paintsOrders);
 return (
  <>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Row justify="space-between">
       <Heading>Zamawianie lakierów</Heading>
       <div>
        <Button variant="outline-dark" onClick={handlePlacedOrders}>
         Złożone zamówienia
        </Button>
        <Button variant="primary" onClick={handleSummary}>
         Podsumowanie
        </Button>
       </div>
      </Row>
      {orders && !isObjectEmpty(paintsOrders) && (
       <OrdersList
        orders={orders}
        view="paintsOrder"
        sortBy={sortOrders}
        handlePaintsOrderCheckbox={handlePaintsOrderCheckbox}
        handlePaintsOrderInput={handlePaintsOrderInput}
        setSortOrders={handleSortOrders}
        paintsOrdersValues={paintsOrders}
        paintsOrdersSkipped={skippedOrders}
        handleRedirect={handleRedirect}
       />
      )}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
   {/* MODALS */}
   {isPlacedOrders && (
    <PlacedOrders closeModal={() => setIsPlacedOrders(false)} />
   )}
   {isSummary && (
    <PaintsOrdersSummary
     closeModal={() => setIsSummary(false)}
     paintsOrdersValues={paintsOrders}
     paintsOrdersSkipped={skippedOrders}
     orders={orders}
    />
   )}
  </>
 );
};

PaintsOrder.propTypes = {};

export default PaintsOrder;
