import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import ClearOrder from "components/organisms/modals/orderForm/ClearOrder";
import Row from "templates/FlexRowTemplate";
import Trash from "components/atoms/icons/Trash";
import {
 removeColor,
 removeGlassCase,
 removeHandle1,
 removeHandle2,
 removeMilling,
 removeVeneer
} from "actions/newOrder";

const StyledWrapper = styled.div`
 p {
  margin-bottom: 5px;
 }
`;

const OrderFormData = props => {
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 const [isButton, setIsButton] = useState(false);
 const [isClearOrder, setIsClearOrder] = useState(false);

 const {
  color,
  handleSymbol1,
  handleSymbol2,
  millingSymbol,
  glassCaseSymbol,
  veneerSymbol
 } = newOrder;

 useEffect(() => {
  if (
   color ||
   handleSymbol1 ||
   handleSymbol2 ||
   millingSymbol ||
   glassCaseSymbol ||
   veneerSymbol
  )
   setIsButton(true);
  else setIsButton(false);
 });

 return (
  <>
   <StyledWrapper>
    {color && (
     <Fade>
      <p>
       <Trash onclick={() => dispatch(removeColor())} />
       <strong> Kolor: </strong>
       {color}
      </p>
     </Fade>
    )}
    {handleSymbol1 && (
     <Fade>
      <p>
       <Trash onclick={() => dispatch(removeHandle1())} />
       <strong> Uchwyt (1): </strong>
       {handleSymbol1}
      </p>
     </Fade>
    )}
    {handleSymbol2 && (
     <Fade>
      <p>
       <Trash onclick={() => dispatch(removeHandle2())} />
       <strong> Uchwyt (2): </strong>
       {handleSymbol2}
      </p>
     </Fade>
    )}
    {millingSymbol && (
     <Fade>
      <p>
       <Trash onclick={() => dispatch(removeMilling())} />
       <strong> Wzór frezowania: </strong>
       {millingSymbol}
      </p>
     </Fade>
    )}
    {glassCaseSymbol && (
     <Fade>
      <p>
       <Trash onclick={() => dispatch(removeGlassCase())} />
       <strong> Wzór witryny: </strong>
       {glassCaseSymbol}
      </p>
     </Fade>
    )}
    {veneerSymbol && (
     <Fade>
      <p>
       <Trash onclick={() => dispatch(removeVeneer())} />
       <strong> Wzór forniru: </strong>
       {veneerSymbol}
      </p>
     </Fade>
    )}

    {isButton && (
     <Fade>
      <Row justify="flex-end">
       <Button variant="danger" size="sm" onClick={() => setIsClearOrder(true)}>
        Wyczyść
       </Button>
      </Row>
     </Fade>
    )}
   </StyledWrapper>
   {/* MODALS */}
   {isClearOrder && <ClearOrder closeModal={() => setIsClearOrder(false)} />}
  </>
 );
};

OrderFormData.propTypes = {};

export default OrderFormData;
