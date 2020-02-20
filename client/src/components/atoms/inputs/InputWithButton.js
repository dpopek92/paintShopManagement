import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const WithButton = ({ value, onchange, onclick, buttonName, placeholder }) => {
 return (
  <InputGroup>
   <FormControl
    placeholder={placeholder}
    aria-label="Number of elements"
    aria-describedby="elements-number"
    value={value}
    maxLength={20}
    onChange={onchange}
   />
   <InputGroup.Append>
    <Button variant="outline-primary" onClick={onclick}>
     {buttonName}
    </Button>
   </InputGroup.Append>
  </InputGroup>
 );
};

WithButton.propTypes = {
 value: PropTypes.any,
 onchange: PropTypes.func,
 onclick: PropTypes.func,
 buttonName: PropTypes.string,
 placeholder: PropTypes.string
};

WithButton.defaultProps = {
 buttonName: "Dodaj"
};

export default WithButton;
