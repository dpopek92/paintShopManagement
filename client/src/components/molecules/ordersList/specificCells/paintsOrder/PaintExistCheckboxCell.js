import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PaintExistCheckboxCell = ({ item, onchange, paintsOrdersValues }) => {
 const { _id: id } = item;
 const disabled = paintsOrdersValues[id];
 const skippedOrders = useSelector(state => state.paintsOrder.skippedOrders);

 return (
  <td data-notclickable="1">
   <input
    data-notclickable="1"
    disabled={disabled}
    type="checkbox"
    checked={skippedOrders.includes(id)}
    name={id}
    id={id}
    value={id}
    onChange={onchange}
   />
  </td>
 );
};

PaintExistCheckboxCell.propTypes = {
 item: PropTypes.instanceOf(Object),
 onchange: PropTypes.func,
 paintsOrdersValues: PropTypes.instanceOf(Object),
};

export default PaintExistCheckboxCell;
