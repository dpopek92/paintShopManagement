import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";
import { SmallButton as Button } from "components/atoms/button/Buttons";
import { setComponentInModal } from "actions/view";

const StyledWrapper = styled.div`
 text-align: center;
 margin: 5px 5px;
`;

const Handle = () => {
 const dispatch = useDispatch();
 const handleSymbol1 = useSelector(state => state.newOrder.handleSymbol1);
 const handleSymbol2 = useSelector(state => state.newOrder.handleSymbol2);

 const handleClick = () => {
  dispatch(setComponentInModal("handles"));
 };
 return (
  <StyledWrapper>
   <Heading>Rodzaj uchwytu</Heading>
   {handleSymbol1 && <p>{handleSymbol1}</p>}
   {handleSymbol2 && <p>{handleSymbol2}</p>}
   <Button onClick={handleClick}>
    {handleSymbol1 || handleSymbol2 ? "Zmień/Dodaj" : "Wybierz"}
   </Button>
  </StyledWrapper>
 );
};

export default Handle;
