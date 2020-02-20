import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { positionsForTimetables } from 'const/';
import { formatDateToDatePicker } from 'utils/functions/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const OrderPlanPosition = ({ item, index, removePosition, handleValues }) => {
 const maxDate = new Date().getTime() + 1123200000;
 return (
  <div>
   <Form.Control
    type="date"
    max={formatDateToDatePicker(maxDate)}
    style={{
     width: '20%',
     display: 'inline',
     marginRight: 10,
     marginBottom: 5,
    }}
    value={item.date}
    onChange={e => {
     handleValues(e, index, 'date');
    }}
   />

   <Form.Control
    value={item.position}
    style={{ width: '20%', display: 'inline', marginRight: 10 }}
    as="select"
    name="Position"
    onChange={e => handleValues(e, index, 'position')}
   >
    <option value="" disabled />
    {positionsForTimetables.map(pos => (
     <option
      key={pos}
      value={pos}
      className={pos}
      style={{ fontWeight: 'bold' }}
     >
      {pos}
     </option>
    ))}
   </Form.Control>
   <FontAwesomeIcon
    icon={faTrashAlt}
    style={{ color: 'red' }}
    onClick={() => removePosition(index)}
   />
  </div>
 );
};

OrderPlanPosition.propTypes = {};

export default OrderPlanPosition;
