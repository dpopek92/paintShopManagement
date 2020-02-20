import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const PositionsButtons = ({ handleStatus }) => {
 return (
  <>
   <Button
    variant="warning"
    onClick={() => {
     handleStatus("Przygotowanie", "Surówka");
    }}
   >
    Surówka
   </Button>
   <Button
    variant="outline-dark"
    onClick={() => {
     handleStatus("Przygotowanie", "Podkład");
    }}
   >
    Podkład
   </Button>
   <Button
    style={{
     backgroundColor: "#33cec3",
     borderColor: "#33cec3"
    }}
    variant="info"
    onClick={() => {
     handleStatus("Przygotowanie", "Szlifiernia");
    }}
   >
    Szlifiernia
   </Button>
   <Button
    variant="primary"
    onClick={() => {
     handleStatus("Lakierowanie", "Lakiernia");
    }}
   >
    Lakiernia
   </Button>
   <Button
    variant="danger"
    onClick={() => {
     handleStatus("Polerowanie", "Polernia");
    }}
   >
    Polernia
   </Button>
   <Button
    variant="success"
    onClick={() => {
     handleStatus("Pakowanie", "Pakowanie");
    }}
   >
    Pakowanie
   </Button>

   <Button
    variant="dark"
    style={{
     backgroundColor: "#B266FF",
     borderColor: "#B266FF"
    }}
    onClick={() => {
     handleStatus("Do odbioru", "Zakończone");
    }}
   >
    Zakończone
   </Button>
   <Button
    variant="dark"
    onClick={() => {
     handleStatus("Odebrane", "Odebrane");
    }}
   >
    Odebrane
   </Button>
  </>
 );
};

PositionsButtons.propTypes = {
 handleStatus: PropTypes.func
};

export default PositionsButtons;
