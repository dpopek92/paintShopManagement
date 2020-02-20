/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import Item from './ItemRow';

const WideColumn = styled.th`
 width: 95px;
`;
const TightColumn = styled.th`
 width: 50px;
 background-color: ${({ side, theme }) => {
  if (side === 'left') return theme.blowWarning;
  else if (side === 'right') return theme.blowGreen;
 }};
`;
const TighterColumn = styled.th`
 width: 20px;
 background-color: ${({ side, theme }) => side === 'left' && theme.blowWarning};
`;

const Items = ({ items }) => {
 return (
  <div style={{ position: 'relative' }}>
   <Table responsive="xl" bordered hover size="sm">
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
      <th rowSpan="4">Uwagi</th>
      <th rowSpan="2" colSpan="2">
       Powierzchnia
       <br />m<sup>2</sup>
      </th>
     </tr>
     <tr>
      <TightColumn rowSpan="2">
       wys.
       <br />
       <small>[mm]</small>
      </TightColumn>
      <td colSpan="2">Uchwyt frezowany/R</td>
      <td colSpan="2">Otw. pod zaw./R</td>
      <TighterColumn
       side="left"
       rowSpan="2"
       style={{ fontWeight: 'normal', fontSize: 12 }}
      >
       <div>Lakier 100mm po wys</div>
      </TighterColumn>
      <TightColumn rowSpan="2">
       szer.
       <br />
       <small>[mm]</small>
      </TightColumn>
      <td colSpan="2">Uchwyt frezowany/R</td>
      <td colSpan="2">Otw. pod zaw./R</td>
      <TighterColumn
       side="left"
       rowSpan="2"
       style={{ fontWeight: 'normal', fontSize: 12 }}
      >
       <div>Lakier 100mm po szer</div>
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
      <TightColumn side="right"> PL</TightColumn>
      <TightColumn side="left">PP</TightColumn>
     </tr>
    </thead>
    <tbody className="table__body">
     {items.map((item, index) => (
      <Item key={index} item={item} index={index} />
     ))}
    </tbody>
   </Table>
  </div>
 );
};

export default Items;
