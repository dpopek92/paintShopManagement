import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Color from 'components/molecules/ordersFilters/Color';
import Customer from 'components/molecules/ordersFilters/Customer';
import { setEmployeeActiveOrders, setEmployeeFilter } from 'actions/employee';

const StyledWrapper = styled.div`
 display: flex;
 justify-content: flex-start;
 flex-direction: row;
 flex-wrap: nowrap;
 div {
  width: 18%;
  margin: 5px;
  text-align: center;
  div {
   width: 100%;
   margin: 0;
  }
 }
 @media (max-width: 600px) {
  flex-direction: column;
  div {
   width: 100%;
   margin: 5px auto;
   text-align: center;
  }
 }
`;

const Filters = ({ handleClearFilters }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.employee.orders);
 const filters = useSelector(state => state.employee.filters);
 const color = useSelector(state => state.employee.filters.color);
 const colors = useSelector(state => state.employee.colors);
 const customer = useSelector(state => state.employee.filters.customer);
 const customers = useSelector(state => state.employee.customers);

 useEffect(() => {
  let filteredOrders = orders;
  if (orders) {
   if (filters.customer) {
    filteredOrders = filteredOrders.filter(item => item.user.company.includes(filters.customer));
   }
   if (filters.color) {
    filteredOrders = filteredOrders.filter(item => item.color.includes(filters.color));
   }
  }

  dispatch(setEmployeeActiveOrders(filteredOrders));
 }, [filters.customer, filters.color, orders]);

 //  HANDLERS
 const handleChange = (type, e) => {
  dispatch(setEmployeeFilter(type, e.target.value));
 };
 return (
  <div style={{ marginBottom: 20 }}>
   <StyledWrapper>
    <Customer
     orders={orders}
     customer={customer}
     customers={customers}
     handleChange={e => handleChange('customer', e)}
    />
    <Color
     orders={orders}
     color={color}
     colors={colors}
     handleChange={e => handleChange('color', e)}
    />

    <Button variant="warning" onClick={handleClearFilters} style={{ margin: 0 }}>
     Widok domyślny
    </Button>
   </StyledWrapper>
  </div>
 );
};

Filters.propTypes = {
 handleClearFilters: PropTypes.func,
};

export default Filters;
