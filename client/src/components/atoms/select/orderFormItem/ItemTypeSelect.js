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

const ItemTypeSelect = ({ value, newOrder, fastWrite, onchange }) => (
 <StyledSelect
  tabIndex={fastWrite ? "-1" : "0"}
  name="type"
  value={value}
  onChange={onchange}
  required
 >
  {newOrder.millingSymbol === "CNC" ? (
   <option value="Gładki CNC">Gładki CNC</option>
  ) : null}
  {newOrder.millingSymbol && newOrder.millingSymbol !== "CNC" ? (
   <option value="Frez">Frez</option>
  ) : null}
  <option value="Gładki">Gładki</option>
  {newOrder.glassCaseSymbol && <option value="Witryna">Witryna</option>}
 </StyledSelect>
);

ItemTypeSelect.propTypes = {
 value: PropTypes.string,
 newOrder: PropTypes.object,
 fastWrite: PropTypes.bool,
 onchange: PropTypes.func
};

export default ItemTypeSelect;
