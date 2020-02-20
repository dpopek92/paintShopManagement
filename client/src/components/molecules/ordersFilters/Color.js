import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";

const Color = ({ orders, handleChange, colors, color }) => {
 return (
  <div>
   <Heading>Kolor</Heading>
   <Form.Control
    as="select"
    onChange={handleChange}
    value={color}
    disabled={!orders}
   >
    <option value=""></option>
    {colors
     .sort((a, b) => ("" + a).localeCompare(b))
     .map(item => (
      <option key={item} value={item}>
       {item}
      </option>
     ))}
   </Form.Control>
  </div>
 );
};

Color.propTypes = {
 orders: PropTypes.array,
 handleChange: PropTypes.func,
 colors: PropTypes.array,
 color: PropTypes.string
};

export default Color;
