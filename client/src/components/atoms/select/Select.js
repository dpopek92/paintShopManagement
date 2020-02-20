import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const Select = ({ items, value, handleChange }) => {
 return (
  <Form.Control
   value={value}
   as="select"
   name={value}
   onChange={e => handleChange(e.target.value)}
  >
   <option value=""></option>
   {items &&
    items.map(item => (
     <option
      key={item}
      value={item}
      className={item}
      style={{ fontWeight: "bold" }}
     >
      {item}
     </option>
    ))}
  </Form.Control>
 );
};

Select.propTypes = {
 items: PropTypes.array,
 value: PropTypes.string,
 handleChange: PropTypes.func
};

export default Select;
