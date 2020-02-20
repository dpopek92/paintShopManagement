import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";
import { SmallButton as Button } from "components/atoms/button/Buttons";
import { addPaintType } from "actions/newOrder";
import { setComponentInModal } from "actions/view";

const StyledWrapper = styled.div`
 text-align: center;
 margin: 5px 5px;
`;
const StyledSelect = styled.select`
 border-radius: 5px;
 padding: 3px 5px;
 width: 90%;
`;

const Color = () => {
 const dispatch = useDispatch();
 const color = useSelector(state => state.newOrder.color);
 const paintType = useSelector(state => state.newOrder.paintType);

 const handleClick = () => {
  dispatch(setComponentInModal("colors"));
 };
 const handlePaintType = e => {
  dispatch(addPaintType(e.target.value));
 };
 return (
  <StyledWrapper>
   <Heading>Kolor</Heading>
   {color && <p>{color}</p>}
   <Button onClick={handleClick}>{color ? "Zmień" : "Wybierz"}</Button>
   <StyledSelect name="paintType" value={paintType} onChange={handlePaintType}>
    <option value="Półmat">Półmat</option>
    <option value="Połysk">Połysk</option>
    <option value="Mat">Mat</option>
   </StyledSelect>
  </StyledWrapper>
 );
};

export default Color;
