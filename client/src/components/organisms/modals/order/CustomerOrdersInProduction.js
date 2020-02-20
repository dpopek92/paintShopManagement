import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import { Button } from 'react-bootstrap';
import List from 'components/molecules/ordersList/static/List';
import { setSpinner, setSortList } from 'actions/view';
import { getOrder } from 'actions/orders';
import { signal } from 'const';

const CustomerOrdersInProduction = ({ closeModal }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.orders.ordersInProd);
 const sortBy = useSelector(state => state.view.sortList.inProductionList);
 const handleRedirect = id => {
  dispatch(setSpinner(true));
  dispatch(
   getOrder(
    id,
    () => {
     dispatch(setSpinner(false));
     closeModal();
    },
    signal.token,
   ),
  );
 };
 const handleSort = sort => {
  dispatch(setSortList('inProductionList', sort));
 };
 return (
  <Modal closeModal={closeModal} title="Zamówienia na produkcji" size="xl">
   <List
    orders={orders}
    view="inProductionList"
    sortBy={sortBy}
    setSortOrders={handleSort}
    handleRedirect={handleRedirect}
   />

   <hr />
   <Row justify="flex-end">
    <Button variant="danger" onClick={closeModal}>
     Zamknij
    </Button>
   </Row>
  </Modal>
 );
};

CustomerOrdersInProduction.propTypes = {
 closeModal: PropTypes.func,
};

export default CustomerOrdersInProduction;
