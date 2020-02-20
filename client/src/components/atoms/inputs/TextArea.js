import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const Input = ({ value, onchange, placeholder, name = "" }) => {
 return (
  <Form.Control
   as="textarea"
   name={name}
   value={value}
   onChange={onchange}
   placeholder={placeholder}
   autoComplete="off"
  />
 );
};

Input.propTypes = {
 value: PropTypes.string,
 onchange: PropTypes.func,
 placeholder: PropTypes.string,
 name: PropTypes.string
};

export default Input;
