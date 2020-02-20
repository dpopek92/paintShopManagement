import React from 'react';
import PropTypes from 'prop-types';

const PaintsOrdersSummaryTableRow = ({ item, orders, index }) => {
 const { length } = item.orders;
 const { color, paintType, quantity, surfaceRight, surfaceLeft } = item;

 return (
  <>
   {item.orders.map((order, i) => {
    const orderData = orders.find(item => item._id === order);
    // console.log(orderData);
    if (i === 0) {
     return (
      <tr key={order}>
       <td rowSpan={length}>{index + 1}</td>
       <td>
        {orderData.user
         ? `${orderData.user.company}-${orderData.user.firstname[0]} nr. ${orderData.number}`
         : ''}
       </td>
       <td rowSpan={length}>{surfaceRight ? surfaceRight.toFixed(2) : ''}</td>
       <td rowSpan={length}>{surfaceLeft ? surfaceLeft.toFixed(2) : ''}</td>
       <td rowSpan={length}>{color}</td>
       <td
        rowSpan={length}
        style={paintType === 'Połysk' ? { fontWeight: 'bold' } : {}}
       >
        {paintType}
       </td>
       <td rowSpan={length}>{quantity.toFixed(2)}</td>
      </tr>
     );
    }
    return (
     <tr key={order}>
      <td>
       {orderData.user
        ? `${orderData.user.company}-${orderData.user.firstname[0]} nr. ${orderData.number}`
        : ''}
      </td>
     </tr>
    );
   })}
  </>
 );
};

PaintsOrdersSummaryTableRow.propTypes = {};

export default PaintsOrdersSummaryTableRow;
