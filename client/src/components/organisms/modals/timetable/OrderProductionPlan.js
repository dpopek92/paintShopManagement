import React, { useEffect, useState } from 'react';
import update from 'immutability-helper';
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
import { formatDateToDatePicker } from 'utils/functions/date';
import { addOrderToTimetables } from 'utils/apiHandlers/timetable/update';
import { getAllTimetables } from 'actions/timetable';
import { signal } from 'const';
import OrderProductionPlanDetails from './OrderProductionPlanDetails';

const StyledFilter = styled.div`
 margin-bottom: 5px;
 max-width: 300px;
`;

const OrderProductionPlan = ({ closeModal }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.production.list);
 const customers = useSelector(state => state.production.customers);
 const sortOrders = useSelector(state => state.view.sortList.production);

 const [customer, setCustomer] = useState('');
 const [filteredOrder, setFilteredOrder] = useState([]);

 const [order, setOrder] = useState(null);

 const [productionPlan, setProductionPlan] = useState([
  { date: formatDateToDatePicker(new Date()), position: '' },
 ]);

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

 const handleCustomer = e => setCustomer(e.target.value);

 const addOrder = orderObj => {
  setOrder(orderObj);
 };

 const handleAddPositionToPlan = () => {
  setProductionPlan(
   productionPlan.concat({
    date: formatDateToDatePicker(new Date()),
    position: '',
   }),
  );
 };

 const handleRemovePositionFromPlan = index => {
  setProductionPlan(productionPlan.filter((item, i) => i !== index));
 };

 const handleProductionPlanValues = (e, index, field) => {
  setProductionPlan(
   update(productionPlan, { [index]: { [field]: { $set: e.target.value } } }),
  );
 };

 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  const body = { orderId: order._id, productionPlan };
  await addOrderToTimetables(body, () => {
   dispatch(
    getAllTimetables(signal.token, () => {
     dispatch(setSpinner(false));
     closeModal();
    }),
   );
  });
 };

 return (
  <Modal
   closeModal={closeModal}
   title="Planowanie produkcji zamówienia"
   size="xl"
  >
   {!order ? (
    <>
     {' '}
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
        view="orderProductionPlan"
        setSortOrders={handleSortOrders}
        addOrder={addOrder}
       />
      )}
     </div>
    </>
   ) : (
    <OrderProductionPlanDetails
     order={order}
     addPosition={handleAddPositionToPlan}
     removePosition={handleRemovePositionFromPlan}
     handleValues={handleProductionPlanValues}
     productionPlan={productionPlan}
    />
   )}
   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     disabled={!order || productionPlan.find(item => !item.position)}
     onClick={handleSubmit}
    >
     Zatwierdź
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Zamknij
    </Button>
   </Row>
  </Modal>
 );
};

OrderProductionPlan.propTypes = { closeModal: PropTypes.func };

export default OrderProductionPlan;
