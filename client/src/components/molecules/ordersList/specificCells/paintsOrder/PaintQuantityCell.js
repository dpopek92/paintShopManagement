import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
 width: 100px;
 border-radius: 3px;
 border: 1px solid lightgray;
 &::placeholder {
  color: #999999;
 }
`;

const PaintQuantityCell = ({
 item,
 onchange,
 paintsOrdersValues,
 paintsOrdersSkipped,
}) => {
 const { surfaceRight, surfaceLeft, _id: id } = item;

 let placeholder = 0;
 if (surfaceRight) placeholder += surfaceRight * 0.33;
 if (surfaceLeft) placeholder += surfaceLeft * 0.4;

 const value = paintsOrdersValues[id];

 const disabled = paintsOrdersSkipped.includes(id);

 return (
  <td data-notclickable="1">
   <StyledInput
    data-notclickable="1"
    placeholder={placeholder ? placeholder.toFixed(2) : 0}
    style={{ width: 100 }}
    disabled={disabled}
    type="text"
    name={id}
    id={id}
    value={value || ''}
    onChange={e => onchange(e, id)}
   />
  </td>
 );
};

PaintQuantityCell.propTypes = {
 item: PropTypes.instanceOf(Object),
 onchange: PropTypes.func,
 paintsOrdersSkipped: PropTypes.arrayOf(PropTypes.string),
 paintsOrdersValues: PropTypes.instanceOf(Object),
};

export default PaintQuantityCell;
