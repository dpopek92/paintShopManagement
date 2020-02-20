import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CustomSelect = ({ items, value, onchange, name, placeholder }) => {
 return (
  <Form.Control value={value} as="select" name={name} onChange={onchange}>
   <option value="" disabled>
    {placeholder}
   </option>
   {items &&
    items
     .sort((a, b) => {
      return a.company.localeCompare(b.company);
     })
     .map(item => (
      <option value={item._id} key={item._id}>
       {item.company} - {item.firstname[0]}
      </option>
     ))}
  </Form.Control>
 );
};

CustomSelect.propTypes = {
 items: PropTypes.array,
 value: PropTypes.string,
 onchange: PropTypes.func,
 placeholder: PropTypes.string
};

export default CustomSelect;
