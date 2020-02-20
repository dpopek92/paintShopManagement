import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
 height: 28px;
 width: 100%;
 border-radius: 3px;
 border: 1px solid lightgray;
 &:focus {
  background-color: ${({ theme }) => theme.blowPrimaryLight};
 }
`;

const ItemRightSideEdgeSelect = ({
 fastWrite,
 newOrder,
 name,
 value,
 onchange,
 onfocus,
 onblur,
}) => (
 <StyledSelect
  tabIndex={fastWrite ? '-1' : '0'}
  name={name}
  value={value}
  onChange={onchange}
  onFocus={onfocus}
  onBlur={onblur}
  required
 >
  {newOrder.paintType === 'Połysk' ? (
   <option value="R2">R2</option>
  ) : (
   <option value="R1">R1</option>
  )}
  {newOrder.handleSymbol1 && (
   <option value={newOrder.handleSymbol1}>{newOrder.handleSymbol1}</option>
  )}
  {newOrder.handleSymbol2 && (
   <option value={newOrder.handleSymbol2}>{newOrder.handleSymbol2}</option>
  )}
  {newOrder.isChamfering && <option value="Gierunek">Gierunek</option>}
  <option value="-">-</option>
 </StyledSelect>
);

ItemRightSideEdgeSelect.propTypes = {
 fastWrite: PropTypes.bool,
 newOrder: PropTypes.instanceOf(Object),
 name: PropTypes.string,
 value: PropTypes.string,
 onchange: PropTypes.func,
 onfocus: PropTypes.func,
 onblur: PropTypes.func,
};

export default ItemRightSideEdgeSelect;
