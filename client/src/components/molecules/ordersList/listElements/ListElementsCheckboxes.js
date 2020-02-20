import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { StyledH3 as Heading } from "components/atoms/heading/Headings";

const ListElementsCheckboxes = ({ handleCheckbox, elements }) => {
 return (
  <div>
   <Heading>Elementy listy</Heading>
   <Form.Group controlId="lp">
    <Form.Check type="checkbox" checked disabled label="Lp" />
   </Form.Group>{" "}
   <Form.Group controlId="klient">
    <Form.Check type="checkbox" checked disabled label="Klient" />
   </Form.Group>{" "}
   <Form.Group controlId="nr">
    <Form.Check type="checkbox" checked disabled label="Numer" />
   </Form.Group>{" "}
   <Form.Group controlId="nazwa">
    <Form.Check
     type="checkbox"
     checked={elements.name}
     onChange={handleCheckbox}
     value="name"
     name="name"
     label="Nazwa"
    />
   </Form.Group>
   <Form.Group controlId="kolor">
    <Form.Check
     type="checkbox"
     checked={elements.color}
     onChange={handleCheckbox}
     value="color"
     label="Kolor"
    />
   </Form.Group>{" "}
   <Form.Group controlId="matowosc">
    <Form.Check
     type="checkbox"
     checked={elements.paintType}
     onChange={handleCheckbox}
     value="paintType"
     label="Matowość"
    />
   </Form.Group>{" "}
   <Form.Group controlId="elements">
    <Form.Check
     type="checkbox"
     checked={elements.elements}
     onChange={handleCheckbox}
     value="elements"
     label="Elementy"
    />
   </Form.Group>{" "}
   <Form.Group controlId="PL">
    <Form.Check
     type="checkbox"
     checked={elements.PL}
     onChange={handleCheckbox}
     value="PL"
     label="PL"
    />
   </Form.Group>{" "}
   <Form.Group controlId="PP">
    <Form.Check
     type="checkbox"
     checked={elements.PP}
     onChange={handleCheckbox}
     value="PP"
     label="PP"
    />
   </Form.Group>
   <Form.Group controlId="Type">
    <Form.Check
     type="checkbox"
     checked={elements.type}
     onChange={handleCheckbox}
     value="type"
     label="Typ"
    />
   </Form.Group>
   <Form.Group controlId="finishDate">
    <Form.Check
     type="checkbox"
     checked={elements.finishDate}
     onChange={handleCheckbox}
     value="finishDate"
     label="Data realizacji"
    />
   </Form.Group>
   <Form.Group controlId="status">
    <Form.Check
     type="checkbox"
     checked={elements.status}
     onChange={handleCheckbox}
     value="status"
     label="Status"
    />
   </Form.Group>
   <Form.Group controlId="lastOperation">
    <Form.Check
     type="checkbox"
     checked={elements.lastOperation}
     onChange={handleCheckbox}
     value="lastOperation"
     label="Ostatnia operacja"
    />
   </Form.Group>
  </div>
 );
};

ListElementsCheckboxes.propTypes = {
 handleCheckbox: PropTypes.func,
 elements: PropTypes.object
};

export default ListElementsCheckboxes;
