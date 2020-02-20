import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { StyledH3 as Heading } from "components/atoms/heading/Headings";
import { employeesPositions } from "const";

const PositionsCheckboxes = ({ handleCheckbox, elements }) => {
 return (
  <div>
   <Heading>Stanowiska</Heading>
   {employeesPositions.map((item, index) => (
    <Form.Group key={index} controlId={item}>
     <Form.Check
      type="checkbox"
      checked={elements[item]}
      onChange={handleCheckbox}
      value={item}
      label={item}
     />
    </Form.Group>
   ))}
  </div>
 );
};

PositionsCheckboxes.propTypes = {
 handleCheckbox: PropTypes.func,
 elements: PropTypes.object
};

export default PositionsCheckboxes;
