import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { sortByDateDesc } from 'utils/sort/sortMethods';
import PlacedOrdersTableRow from './PlacedOrdersTableRow';

const PlacedOrdersTable = ({ orders, year, month }) => {
 return (
  <Table bordered striped hover>
   <thead>
    <tr>
     <th>LP</th>
     <th>Data</th>
     <th>Zamawiał</th>
     <th>Kolory</th>
     <th>Pobierz</th>
    </tr>
   </thead>
   <tbody>
    {orders.sort(sortByDateDesc).map((item, index) => (
     <PlacedOrdersTableRow
      index={index}
      item={item}
      key={item._id}
      year={year}
      month={month}
     />
    ))}
   </tbody>
  </Table>
 );
};

PlacedOrdersTable.propTypes = {
 year: PropTypes.string,
 month: PropTypes.string,
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

export default PlacedOrdersTable;
