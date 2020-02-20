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

const GlassCase = () => {
 const dispatch = useDispatch();
 const glassCaseSymbol = useSelector(state => state.newOrder.glassCaseSymbol);

 const handleClick = () => {
  dispatch(setComponentInModal("glassCases"));
 };
 return (
  <StyledWrapper>
   <Heading>Wzór witryny</Heading>
   {glassCaseSymbol && <p>{glassCaseSymbol}</p>}
   <Button onClick={handleClick}>
    {glassCaseSymbol ? "Zmień" : "Wybierz"}
   </Button>
  </StyledWrapper>
 );
};

export default GlassCase;
