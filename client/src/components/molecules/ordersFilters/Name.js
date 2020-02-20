import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";

const Name = ({ orders, name, handleChange }) => {
 return (
  <div>
   <Heading>Nazwa</Heading>
   <Form.Control
    type="text"
    onChange={handleChange}
    value={name}
    disabled={!orders}
   ></Form.Control>
  </div>
 );
};

Name.propTypes = {
 orders: PropTypes.array,
 handleChange: PropTypes.func,
 name: PropTypes.string
};

export default Name;
