import React from 'react';
import PropTypes from 'prop-types';

const SkippedOrdersTableRow = ({ order, index }) => {
 return (
  <>
   {order && (
    <tr>
     <td>{index + 1}</td>
     <td>
      {order.user ? `${order.user.company} - ${order.user.firstname[0]}` : ''}
     </td>
     <td>{order.number}</td>
     <td>{order.color}</td>
     <td>{order.paintType}</td>
     <td>{order.elements}</td>
     <td>{order.surfaceRight ? order.surfaceRight.toFixed(2) : ''}</td>
     <td>{order.surfaceLeft ? order.surfaceLeft.toFixed(2) : ''}</td>
    </tr>
   )}
  </>
 );
};

SkippedOrdersTableRow.propTypes = {
 order: PropTypes.instanceOf(Object),
 index: PropTypes.number,
};

export default SkippedOrdersTableRow;
