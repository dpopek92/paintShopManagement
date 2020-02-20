import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import SkippedOrdersTableRow from './SkippedOrdersTableRow';

const SkippedOrders = ({ orders, skippedOrders }) => {
 return (
  <Table striped bordered hover>
   <thead>
    <tr>
     <th>LP</th>
     <th>Klient</th>
     <th>Nr</th>
     <th>Kolor</th>
     <th>Matowość</th>
     <th>Elementy</th>
     <th>PL</th>
     <th>PP</th>
    </tr>
   </thead>
   <tbody>
    {skippedOrders.map((item, index) => {
     const order = orders.find(order => order._id === item);
     return (
      <SkippedOrdersTableRow
       key={item}
       order={order}
       item={item}
       index={index}
      />
     );
    })}
   </tbody>
  </Table>
 );
};

SkippedOrders.propTypes = {
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 skippedOrders: PropTypes.arrayOf(PropTypes.string),
};

export default SkippedOrders;
