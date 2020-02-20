import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import { dateToString } from 'utils/functions/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const StyledIcon = styled.span`
 font-size: 20px;
 cursor: ${({ isOrdersInProd }) => (isOrdersInProd ? 'pointer' : 'default')};
 color: ${({ isOrdersInProd }) => (isOrdersInProd ? 'black' : 'lightgray')};
 &:hover {
  color: ${({ isOrdersInProd, theme }) =>
   isOrdersInProd ? theme.blowGreen : 'lightgray'};
 }
`;

const OrderStatus = ({ order, permissionContext, setIsOrdersInProduction }) => {
 const ordersInProd = useSelector(state => state.orders.ordersInProd);

 const productionStatusArr =
  order.productionStatus && order.productionStatus.split(' ');
 return (
  <div style={{ textAlign: 'right' }}>
   {order.productionStatus && (
    <div>
     <StyledIcon isOrdersInProd={ordersInProd && ordersInProd.length > 0}>
      <FontAwesomeIcon
       icon={faInfoCircle}
       style={{ marginRight: 10, fontSize: 20 }}
       title="Zamówienia na produkcji"
       onClick={() => {
        if (ordersInProd && ordersInProd.length > 0)
         setIsOrdersInProduction(true);
       }}
      />
     </StyledIcon>
     <span style={{ fontSize: 20 }}>
      Status produkcyjny:{' '}
      {productionStatusArr.map(item => (
       <span style={{ fontWeight: 'bold' }} className={item} key={item}>
        {item}{' '}
       </span>
      ))}
     </span>
    </div>
   )}
   {order.pickUpDate && (
    <div>
     <span style={{ fontSize: 18 }}>
      Data odbioru:{' '}
      <span style={{ fontWeight: 'bold' }}>
       {dateToString(order.pickUpDate)}
      </span>
     </span>
    </div>
   )}
   {permissionContext === 'admin' && (
    <span>
     <span style={{ fontSize: 15 }}>
      Status płatności:{' '}
      <strong
       style={{
        color: order.isPaid ? 'green' : 'red',
        fontWeight: 'bold',
       }}
      >
       {order.isPaid ? 'Opłacone' : 'Nieopłacone'}
      </strong>
     </span>
    </span>
   )}
  </div>
 );
};

OrderStatus.propTypes = {
 order: PropTypes.instanceOf(Object),
 permissionContext: PropTypes.string,
 setIsOrdersInProduction: PropTypes.func,
};

export default withContext(OrderStatus);
