import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import PaintsOrdersSummaryTableRow from './PaintsOrdersSummaryTableRow';

const PaintsOrdersSummaryTable = ({ colors, orders }) => {
 //  console.log(colors);
 //  console.log(orders);
 return (
  <Table striped bordered hover>
   <thead>
    <tr>
     <th>LP</th>
     <th>Dla zamówień</th>
     <th>PL</th>
     <th>PP</th>
     <th>Kolor</th>
     <th>Matowość</th>
     <th>
      Ilość <small>[kg]</small>
     </th>
    </tr>
   </thead>
   <tbody>
    {colors.map((item, index) => (
     <PaintsOrdersSummaryTableRow
      key={`${item.color} ${item.paintType}`}
      item={item}
      index={index}
      orders={orders}
     />
    ))}
   </tbody>
  </Table>
 );
};

PaintsOrdersSummaryTable.propTypes = {
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 colors: PropTypes.instanceOf(Object),
};

export default PaintsOrdersSummaryTable;
