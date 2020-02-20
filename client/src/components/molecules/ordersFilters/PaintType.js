import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";

const PaintType = ({ orders, paintType, handleChange }) => {
 return (
  <div>
   <Heading>Matowość</Heading>
   <Form.Control
    as="select"
    onChange={handleChange}
    value={paintType}
    disabled={!orders}
   >
    <option value=""></option>
    <option value="Półmat" name="Półmat">
     Półmat
    </option>
    <option value="Połysk" name="Połysk">
     Połysk
    </option>
    <option value="Mat" name="Mat">
     Mat
    </option>
   </Form.Control>
  </div>
 );
};

PaintType.propTypes = {
 orders: PropTypes.array,
 handleChange: PropTypes.func,
 paintType: PropTypes.string
};

export default PaintType;
