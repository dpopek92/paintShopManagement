import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { StyledH6 as Heading } from "components/atoms/heading/Headings";
import { addPaintStyle } from "actions/newOrder";

const StyledWrapper = styled.div`
 text-align: center;
 margin: 5px 5px;
`;
const StyledSelect = styled.select`
 width: 150px;
 border-radius: 5px;
 padding: 3px 5px;
`;

const PaintStyle = () => {
 const dispatch = useDispatch();
 const paintStyle = useSelector(state => state.newOrder.paintStyle);

 const handlePaintStyle = e => {
  dispatch(addPaintStyle(e.target.value));
 };
 return (
  <StyledWrapper>
   <Heading>Rodzaj lakierowania</Heading>
   <StyledSelect
    name="paintStyle"
    value={paintStyle}
    onChange={handlePaintStyle}
   >
    <option value="Jednostronne">Jednostronne</option>
    <option value="Dwustronne">Dwustronne</option>
    <option value="Prawa - połysk / Lewa - półmat">
     Prawa - połysk / Lewa - półmat
    </option>
   </StyledSelect>
  </StyledWrapper>
 );
};

export default PaintStyle;
