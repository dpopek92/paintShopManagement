import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import { positionsArray } from 'const/';

const Status = ({ status, orders, handleChange }) => {
 return (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
   <Heading>Status</Heading>
   <Form.Control
    as="select"
    onChange={handleChange}
    value={status}
    disabled={!orders}
   >
    <option value=""></option>
    {positionsArray.map(item => (
     <option
      key={item}
      value={item}
      className={item}
      style={{ fontWeight: 'bold' }}
     >
      {item}
     </option>
    ))}
   </Form.Control>
  </div>
 );
};

Status.propTypes = {
 orders: PropTypes.array,
 handleChange: PropTypes.func,
 status: PropTypes.string,
};

export default Status;
