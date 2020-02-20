import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSelect = styled.select`
 height: 28px;
 width: 100%;
 border-radius: 3px;
 border: 1px solid lightgray;
 &:focus {
  background-color: ${({ theme }) => theme.blowPrimaryLight};
 }
`;

const ItemThicknessSelect = ({ fastWrite, item, onchange }) => {
 let thickness = null;
 const handles = ["UP", "UK", "UP45", "UK45", "P45", "UZ", "UC"];
 if (
  handles.includes(item.h1PEdge) ||
  handles.includes(item.h2PEdge) ||
  handles.includes(item.w1PEdge) ||
  handles.includes(item.w2PEdge)
 ) {
  thickness = (
   <>
    <option value="19">19</option>
    <option value="22">22</option>
   </>
  );
 } else if (item.type === "Frez") {
  thickness = (
   <>
    <option value="19">19</option>
    <option value="22">22</option>
    <option value="25">25</option>
    <option value="28">28</option>
    <option value="30">30</option>
    <option value="38">38</option>
   </>
  );
 } else {
  thickness = (
   <>
    <option value="3">3</option>
    <option value="6">6</option>
    <option value="8">8</option>
    <option value="10">10</option>
    <option value="12">12</option>
    <option value="16">16</option>
    <option value="18">18</option>
    <option value="19">19</option>
    <option value="22">22</option>
    <option value="25">25</option>
    <option value="28">28</option>
    <option value="30">30</option>
    <option value="38">38</option>
   </>
  );
 }

 return (
  <StyledSelect
   tabIndex={fastWrite ? "-1" : "0"}
   name="thickness"
   value={item.thickness}
   onChange={onchange}
   required
  >
   {thickness}
  </StyledSelect>
 );
};

ItemThicknessSelect.propTypes = {
 fastWrite: PropTypes.bool,
 item: PropTypes.object,
 onchange: PropTypes.func
};

export default ItemThicknessSelect;
