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
import Customer from 'components/molecules/ordersFilters/Customer';
import { formatDateToDatePicker } from 'utils/functions/date';
import { editOrderInTimetables } from 'utils/apiHandlers/timetable/update';
import { getAllTimetables } from 'actions/timetable';
import { signal } from 'const';
import { removeDuplicatesInOrdersArray } from 'utils/functions/array';
import { sortByDateAsc } from 'utils/sort/sortMethods';
import OrderProductionEditPlanDetails from './OrderProductionEditPlanDetails';

const StyledFilter = styled.div`
 margin-bottom: 5px;
 max-width: 300px;
`;

const OrderProductionEditPlan = ({ closeModal, timetables }) => {
 const dispatch = useDispatch();
 const sortOrders = useSelector(state => state.view.sortList.production);
 const [orders, setOrders] = useState([]);
 const [customers, setCustomers] = useState([]);
 const [customer, setCustomer] = useState('');
 const [filteredOrder, setFilteredOrder] = useState([]);
 const [order, setOrder] = useState(null);

 const [productionPlan, setProductionPlan] = useState([]);

 useEffect(() => {
  if (timetables) {
   let ordersArr = [];
   timetables.forEach(pos => {
    pos.days.forEach(day => {
     ordersArr = ordersArr.concat(day.orders);
    });
   });
   ordersArr = removeDuplicatesInOrdersArray(ordersArr);
   const customersArr = [];
   ordersArr.forEach(item => {
    if (!customersArr.includes(item.user.company))
     customersArr.push(item.user.company);
   });
   setCustomers(customersArr);
   setOrders(ordersArr);
  }
 }, [timetables]);
 useEffect(() => {
  let newOrders = orders;
  if (customer) {
   newOrders = orders.filter(item => item.user.company.includes(customer));
  }
  setFilteredOrder(newOrders);
 }, [orders, customer]);
 useEffect(() => {
  if (order) {
   let plan = [];
   timetables.forEach(position => {
    position.days.forEach(day => {
     const exist = day.orders.find(item => item._id === order._id);
     if (exist) {
      plan.push({
       date: formatDateToDatePicker(new Date(day.date)),
       position: position.position,
      });
     }
    });
   });
   plan = plan.sort((a, b) => sortByDateAsc(a, b));
   setProductionPlan(plan);
  }
 }, [order]);

 const getOrder = orderObj => setOrder(orderObj);
 const handleSortOrders = sortBy => {
  dispatch(setSortList('production', sortBy));
 };
 const handleCustomer = e => setCustomer(e.target.value);

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
  await editOrderInTimetables(body, () => {
   dispatch(
    getAllTimetables(signal.token, () => {
     dispatch(setSpinner(false));
     closeModal();
    }),
   );
  });
 };

 return (
  <Modal closeModal={closeModal} title="Edycja planu zamówienia" size="xl">
   {!order || !productionPlan.length ? (
    <>
     <StyledFilter>
      <Customer
       orders={orders}
       customer={customer}
       customers={customers}
       handleChange={handleCustomer}
      />
     </StyledFilter>
     <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      {orders.length && (
       <List
        orders={filteredOrder}
        sortBy={sortOrders}
        view="orderProductionPlan"
        setSortOrders={handleSortOrders}
        addOrder={getOrder}
       />
      )}
     </div>
    </>
   ) : (
    <OrderProductionEditPlanDetails
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

OrderProductionEditPlan.propTypes = {
 closeModal: PropTypes.func,
 timetables: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

export default OrderProductionEditPlan;
