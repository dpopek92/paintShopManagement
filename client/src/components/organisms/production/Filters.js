import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Color from 'components/molecules/ordersFilters/Color';
import Status from 'components/molecules/ordersFilters/Status';
import Name from 'components/molecules/ordersFilters/Name';
import Customer from 'components/molecules/ordersFilters/Customer';
import PaintType from 'components/molecules/ordersFilters/PaintType';
import { setActiveList, setProductionFilter } from 'actions/production';
import { setSortList } from 'actions/view';

const StyledWrapper = styled.div`
 display: flex;
 justify-content: space-between;
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
  }
 }
`;

const Filters = ({ handleClearFilters }) => {
 const dispatch = useDispatch();
 const orders = useSelector(state => state.production.list);
 const filters = useSelector(state => state.production.filters);
 const color = useSelector(state => state.production.filters.color);
 const colors = useSelector(state => state.production.colors);
 const customer = useSelector(state => state.production.filters.customer);
 const customers = useSelector(state => state.production.customers);
 const name = useSelector(state => state.production.filters.name);
 const paintType = useSelector(state => state.production.filters.paintType);
 const status = useSelector(state => state.production.filters.status);

 useEffect(() => {
  let filteredOrders = orders;
  if (orders) {
   if (filters.customer) {
    filteredOrders = filteredOrders.filter(item =>
     item.user.company.includes(filters.customer),
    );
   }
   if (filters.color) {
    filteredOrders = filteredOrders.filter(item =>
     item.color.includes(filters.color),
    );
   }
   if (filters.status) {
    filteredOrders = filteredOrders.filter(item =>
     item.productionStatus.includes(filters.status),
    );
   }
   if (filters.paintType) {
    filteredOrders = filteredOrders.filter(item =>
     item.paintType.includes(filters.paintType),
    );
   }
   if (filters.name) {
    filteredOrders = filteredOrders.filter(item =>
     item.name.includes(filters.name),
    );
   }
  }
  dispatch(setActiveList(filteredOrders));
 }, [
  filters.customer,
  filters.status,
  filters.color,
  filters.paintType,
  filters.name,
  orders,
 ]);

 //  HANDLERS
 const handleChange = (filter, e) => {
  dispatch(setProductionFilter(filter, e.target.value));
 };
 const handleClick = () =>
  dispatch(setSortList('production', 'byDeadlineForProduction'));
 return (
  <div style={{ marginBottom: 20 }}>
   <StyledWrapper>
    <Customer
     orders={orders}
     handleChange={e => handleChange('customer', e)}
     customer={customer}
     customers={customers}
    />
    <div>
     <Status
      orders={orders}
      handleChange={e => handleChange('status', e)}
      status={status}
     />
     {status && (
      <div style={{ width: '100%' }}>
       <Fade bottom>
        <Button
         style={{ fontSize: 12, margin: '5px 0', display: 'block' }}
         size="sm"
         variant="outline-secondary"
         onClick={handleClick}
        >
         Sortuj zgodnie z kolejnością produkcji
        </Button>
       </Fade>
      </div>
     )}
    </div>

    <Color
     orders={orders}
     handleChange={e => handleChange('color', e)}
     colors={colors}
     color={color}
    />
    <PaintType
     orders={orders}
     handleChange={e => handleChange('paintType', e)}
     paintType={paintType}
    />
    <Name
     orders={orders}
     handleChange={e => handleChange('name', e)}
     name={name}
    />

    <Button
     variant="warning"
     onClick={handleClearFilters}
     style={{ margin: 0 }}
    >
     Wyczyść filtry
    </Button>
   </StyledWrapper>
  </div>
 );
};

Filters.propTypes = {
 handleClearFilters: PropTypes.func,
};

export default Filters;
