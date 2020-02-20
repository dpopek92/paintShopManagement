import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import PropTypes from "prop-types";
import { setActivePosition, setActiveDay } from "actions/stats";

const Buttons = ({ view }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleClick = e => {
  const { value } = e.currentTarget;
  dispatch(setActivePosition(value));
  if (value === "Blow") {
   dispatch(setActiveDay(null));
  }
 };
 return (
  <>
   {view === "production" && (
    <Row justify="center">
     <Button
      style={{ padding: "10px 40px", letterSpacing: 3, marginBottom: 10 }}
      size="lg"
      variant="outline-success"
      value="Blow"
      onClick={handleClick}
     >
      BLOW
     </Button>
    </Row>
   )}
   <Row justify="space-around">
    {view === "production" && (
     <Button variant="secondary" value="Nowe" onClick={handleClick}>
      Nowe
     </Button>
    )}
    <Button variant="warning" value="Surówka" onClick={handleClick}>
     Surówka
    </Button>
    <Button variant="outline-dark" value="Podkład" onClick={handleClick}>
     Podkład
    </Button>
    <Button variant="info" value="Szlifiernia" onClick={handleClick}>
     Szlifiernia
    </Button>
    <Button variant="primary" value="Lakiernia" onClick={handleClick}>
     Lakiernia
    </Button>
    <Button variant="danger" value="Polernia" onClick={handleClick}>
     Polernia
    </Button>
    <Button variant="success" value="Pakowanie" onClick={handleClick}>
     Pakowanie
    </Button>
    {view === "production" && (
     <Button variant="dark" value="Odebrane" onClick={handleClick}>
      Odebrane
     </Button>
    )}
   </Row>
  </>
 );
};

Buttons.propTypes = {
 view: PropTypes.oneOf(["production", "employee"])
};

export default Buttons;
