import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import List from 'components/molecules/ordersList/static/List';
import { Button } from 'react-bootstrap';
import { setSortList, setSpinner } from 'actions/view';
import { loadProductionOrders } from 'actions/production';
import Customer from 'components/molecules/ordersFilters/Customer';

const StyledFilter = styled.div`
 margin-bottom: 5px;
 max-width: 300px;
`;

const TimetableAddOrder = ({ closeModal, position, handleAddOrder }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.production.list);
 const customers = useSelector(state => state.production.customers);
 const sortOrders = useSelector(state => state.view.sortList.production);

 const [customer, setCustomer] = useState('');
 const [filteredOrder, setFilteredOrder] = useState([]);

 useEffect(() => {
  if (!orders) {
   dispatch(setSpinner(true));
   dispatch(
    loadProductionOrders('inproduction', () => dispatch(setSpinner(false))),
   );
  }
 }, []);
 useEffect(() => {
  let newOrders = orders;
  if (customer) {
   newOrders = orders.filter(item => item.user.company.includes(customer));
  }
  setFilteredOrder(newOrders);
 }, [orders, customer]);

 const handleSortOrders = sortBy => {
  dispatch(setSortList('production', sortBy));
 };
 const addOrder = order => {
  handleAddOrder(position, order);
 };
 const handleCustomer = e => setCustomer(e.target.value);
 return (
  <Modal closeModal={closeModal} title="Dodawanie zamówienia" size="xl">
   <StyledFilter>
    <Customer
     orders={orders}
     customer={customer}
     customers={customers}
     handleChange={handleCustomer}
    />
   </StyledFilter>
   <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
    {filteredOrder && (
     <List
      orders={filteredOrder}
      sortBy={sortOrders}
      view="addToTimetable"
      setSortOrders={handleSortOrders}
      addOrder={addOrder}
     />
    )}
   </div>
   <hr />
   <Row justify="flex-end">
    <Button variant="danger" onClick={closeModal}>
     Zamknij
    </Button>
   </Row>
  </Modal>
 );
};

TimetableAddOrder.propTypes = {};

export default TimetableAddOrder;
