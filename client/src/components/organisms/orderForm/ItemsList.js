import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addOrderItem } from 'actions/newOrder';
import ItemsRow from './ItemsRow';

const WideColumn = styled.th`
 width: 95px;
`;
const TightColumn = styled.th`
 vertical-align: middle;
 width: 50px;
 background-color: ${({ side, theme }) => {
  if (side === 'left') return theme.blowWarning;
  if (side === 'right') return theme.blowGreen;
 }};
`;
const TighterColumn = styled.th`
 width: 20px;
 background-color: ${({ side, theme }) => side === 'left' && theme.blowWarning};
`;

const ItemsList = ({ fastWrite }) => {
 const dispatch = useDispatch();
 const newOrder = useSelector(state => state.newOrder);
 useEffect(() => {
  if (newOrder.items.length === 0) dispatch(addOrderItem());
 }, []);

 return (
  <>
   <Table striped bordered hover size="sm" responsive="md">
    <thead>
     <tr>
      <TightColumn rowSpan="4">Lp</TightColumn>
      <WideColumn rowSpan="4">Typ</WideColumn>
      <th colSpan="6">Wysokość</th>
      <th colSpan="6">Szerokość</th>
      <TightColumn rowSpan="4">
       Grubość płyty
       <br />
       <small>[mm]</small>
      </TightColumn>
      <TightColumn rowSpan="4">Ilość</TightColumn>
      <th rowSpan="2" colSpan="2">
       Lakierowane strony
      </th>
      <TightColumn rowSpan="4">Rys</TightColumn>
      <th rowSpan="4">Uwagi</th>
     </tr>
     <tr>
      <TightColumn rowSpan="2">
       wys.
       <br />
       <small>[mm]</small>
      </TightColumn>

      <td colSpan="2">Uchwyt frezowany/R</td>
      <td colSpan="2">Otwory pod zawiasy(szt)/R</td>
      <TighterColumn rowSpan="2" side="left" style={{ fontWeight: 'normal', fontSize: 12 }}>
       <div>Lakier lewa 100mm po wys</div>
      </TighterColumn>
      <TightColumn rowSpan="2">
       szer.
       <br />
       <small>[mm]</small>
      </TightColumn>
      <td colSpan="2">Uchwyt frezowany/R</td>
      <td colSpan="2">Otwory pod zawiasy(szt)/R</td>
      <TighterColumn rowSpan="2" side="left" style={{ fontWeight: 'normal', fontSize: 12 }}>
       <div>Lakier lewa 100mm po szer</div>
      </TighterColumn>
     </tr>
     <tr>
      <TightColumn side="right">W1</TightColumn>
      <TightColumn side="right">W2</TightColumn>
      <TightColumn side="left">W1'</TightColumn>
      <TightColumn side="left">W2'</TightColumn>
      <TightColumn side="right">S1</TightColumn>
      <TightColumn side="right">S2</TightColumn>
      <TightColumn side="left">S1'</TightColumn>
      <TightColumn side="left">S2'</TightColumn>
      <TightColumn side="right">P</TightColumn>
      <TightColumn side="left">L</TightColumn>
     </tr>
    </thead>
    <tbody>
     {newOrder.items.map((item, index) => (
      <ItemsRow key={index} item={item} newOrder={newOrder} index={index} fastWrite={fastWrite} />
     ))}
    </tbody>
   </Table>
  </>
 );
};

ItemsList.propTypes = { fastWrite: PropTypes.bool };

export default ItemsList;
