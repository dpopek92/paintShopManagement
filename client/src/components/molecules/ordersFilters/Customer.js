import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';

const Customer = ({ orders, customer, customers, handleChange }) => {
 return (
  <div>
   <Heading>Klient</Heading>
   <Form.Control
    as="select"
    onChange={handleChange}
    value={customer}
    disabled={!orders}
   >
    <option value="" />
    {customers
     .sort((a, b) => `${a}`.localeCompare(b))
     .map(item => (
      <option key={item} value={item}>
       {item}
      </option>
     ))}
   </Form.Control>
  </div>
 );
};

Customer.propTypes = {
 orders: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 handleChange: PropTypes.func,
 customers: PropTypes.arrayOf(PropTypes.string),
 customer: PropTypes.string,
};

export default Customer;
