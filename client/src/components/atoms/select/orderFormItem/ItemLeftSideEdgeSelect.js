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

const ItemLeftSideEdgeSelect = ({
 fastWrite,
 name,
 value,
 newOrder,
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
  <option value="-">-</option>
  {newOrder.paintType === 'Połysk' ? (
   <option value="R2">R2</option>
  ) : (
   <option value="R1">R1</option>
  )}
  <option value="2 otw">2 otw.</option>
  <option value="3 otw">3 otw.</option>
  <option value="4 otw">4 otw.</option>
  <option value="5 otw">5 otw.</option>
  <option value="6 otw">6 otw.</option>
  <option value="7 otw">7 otw.</option>
  {newOrder.isNut && <option value="Nut">Nut</option>}
  {newOrder.isFelc && <option value="Felc">Felc</option>}
  {newOrder.isChamfering && <option value="Gierunek">Gierunek</option>}
 </StyledSelect>
);

ItemLeftSideEdgeSelect.propTypes = {
 fastWrite: PropTypes.bool,
 newOrder: PropTypes.instanceOf(Object),
 name: PropTypes.string,
 value: PropTypes.string,
 onchange: PropTypes.func,
 onfocus: PropTypes.func,
 onblur: PropTypes.func,
};

export default ItemLeftSideEdgeSelect;
