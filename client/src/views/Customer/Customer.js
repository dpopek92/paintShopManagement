import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Data from 'components/organisms/customer/CustomerData';
import Prices from 'components/organisms/customer/CustomerPrices';
import List from 'components/molecules/ordersList/static/List';
import UserRemove from 'components/organisms/modals/customers/UserRemove';
import { setSpinner, setSortList } from 'actions/view';
import { loadCustomerData, loadCustomerOrders } from 'actions/customers';
import { loadPrices } from 'actions/prices';
import { signal } from 'const/';
import { setActiveCustomer } from 'actions/stats';
import { withRouter } from 'react-router';
import AddSubordinates from 'components/organisms/modals/customers/AddSubordinates';

const Customer = ({ match, history }) => {
 const dispatch = useDispatch();
 const customerData = useSelector(state => state.customers.customerData);
 const orders = useSelector(state => state.customers.customerOrders);
 const globalPrices = useSelector(state => state.prices.globalPrices);
 const sortBy = useSelector(state => state.view.sortList.customerOrders);
 const userId = match.params.id;
 // display
 const [isUserRemove, setIsUserRemove] = useState(false);
 const [isAddSubordinates, setIsAddSubordinates] = useState(false);

 // GET DATA
 useEffect(() => {
  if (!customerData || (customerData && customerData._id !== userId)) {
   dispatch(setSpinner(true));
   dispatch(
    loadCustomerData(userId, () => dispatch(setSpinner(false)), signal.token),
   );
   dispatch(
    loadCustomerOrders(userId, () => dispatch(setSpinner(false)), signal.token),
   );
  }
  if (!globalPrices) {
   dispatch(setSpinner(true));
   dispatch(loadPrices(() => dispatch(setSpinner(false)), signal.token));
  }
 }, []);

 // HANLDERS
 const handleUserRemove = () => setIsUserRemove(true);
 const handleAddSubordinates = () => setIsAddSubordinates(true);
 const handleSortOrders = sort => dispatch(setSortList('customerOrders', sort));
 const handleGoToStats = () => {
  dispatch(setActiveCustomer(userId));
  history.push('/statistics/customers');
 };

 return (
  <>
   <PageTemplate>
    {customerData && globalPrices && (
     <FullWidthTemplate>
      <>
       <Row justify="space-between">
        <Heading>{`${customerData.company} - ${customerData.ordersNumber} zamówień`}</Heading>
        <div>
         <Button variant="danger" onClick={handleUserRemove}>
          Usuń użytkownika
         </Button>
         <Button variant="outline-dark" onClick={handleAddSubordinates}>
          Wybierz podwładnych
         </Button>
         <Button variant="primary" onClick={handleGoToStats}>
          Wyświetl statystyki
         </Button>
        </div>
       </Row>
       <div>
        {!customerData.isAccepted && (
         <h2 style={{ color: 'red' }}>
          Konto niepotwierdzone.{' '}
          <a href={`https://zamowfronty.pl/api/verify/${customerData._id}`}>
           {' '}
           Kliknij aby aktywować
          </a>
          .
         </h2>
        )}
        <Row justify="space-between">
         <Data data={customerData} />
         {customerData.discounts && (
          <Prices
           data={customerData}
           globalPrices={globalPrices}
           userId={userId}
          />
         )}
        </Row>
        <hr />
        <Heading>Zamówienia</Heading>
        {orders && (
         <List
          view="customer"
          orders={orders}
          sortBy={sortBy}
          setSortOrders={handleSortOrders}
          customerId={userId}
         />
        )}
       </div>
      </>
     </FullWidthTemplate>
    )}
   </PageTemplate>
   {/* MODALS */}
   {isUserRemove && (
    <UserRemove userId={userId} closeModal={() => setIsUserRemove(false)} />
   )}
   {isAddSubordinates && (
    <AddSubordinates
     closeModal={() => setIsAddSubordinates(false)}
     customerId={userId}
    />
   )}
  </>
 );
};

// Customer.propTypes = {};

export default withRouter(Customer);
