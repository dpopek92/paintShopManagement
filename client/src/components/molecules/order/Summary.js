import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';

const TightColumn = styled.th`
 width: 150px;
 background-color: ${({ side, theme }) => {
  if (side === 'left') return theme.blowWarning;
  if (side === 'right') return theme.blowGreen;
  return 'white';
 }};
`;
const PrimaryColumn = styled.td`
 background-color: rgba(205, 231, 169, 0.5);
`;
const SecondaryColumn = styled.td`
 background-color: rgba(252, 215, 160, 0.5);
`;

const Summary = ({ order, permissionContext }) => {
 return (
  <Table responsive striped bordered hover size="sm">
   <thead>
    <tr>
     <th rowSpan={2}>
      Ilość elementów:
      <br />
      <small>(szt.)</small>
     </th>

     <th colSpan={2}>
      Powierzchnia lakierowana*:
      <br />
      <small>
       (m<sup>2</sup>)
      </small>
     </th>

     <th rowSpan={2}>
      Uchwyt frezowany:
      <br />
      <small>(mb)</small>
     </th>

     {order.milledPartHandle ? (
      <th rowSpan={2}>
       Uchwyt częściowy:
       <br />
       <small>(szt)</small>
      </th>
     ) : null}
     {order.chamfering ? (
      <th rowSpan={2}>
       Gierowanie:
       <br />
       <small>(mb)</small>
      </th>
     ) : null}
     {order.backMilling ? (
      <th rowSpan={2}>
       Frezowanie pod plecy:
       <br />
       <small>(mb)</small>
      </th>
     ) : null}

     <th rowSpan={2}>
      Ilość otworów:
      <br />
      <small>(szt.)</small>
     </th>
     {permissionContext !== 'employee' && permissionContext !== 'display' && (
      <>
       {order.manHours && order.manHours.hours ? (
        <th rowSpan={2}>
         Prace stolarskie:
         <br />
         <small>(h)</small>
        </th>
       ) : null}
       <th rowSpan={2}>
        Przewidywana cena*:
        <br />
        <small>(zł)</small>
       </th>
      </>
     )}
    </tr>
    <tr>
     <TightColumn side="right">PL</TightColumn>
     <TightColumn side="left">PP</TightColumn>
    </tr>
   </thead>
   <tbody>
    <tr>
     <td>{order.elements}</td>
     <PrimaryColumn>
      {order.surfaceRight && order.surfaceRight.toFixed(3)}
     </PrimaryColumn>
     <SecondaryColumn>
      {order.surfaceLeft && order.surfaceLeft.toFixed(3)}
     </SecondaryColumn>
     <td>{order.milledHandle && order.milledHandle.toFixed(2)}</td>
     {order.milledPartHandle ? (
      <td>{order.milledPartHandle && order.milledPartHandle}</td>
     ) : null}
     {order.chamfering ? (
      <td>{order.chamfering && order.chamfering.toFixed(2)}</td>
     ) : null}
     {order.backMilling ? (
      <td>{order.backMilling && order.backMilling.toFixed(2)}</td>
     ) : null}
     <td>{order.hingesHoles}</td>
     {permissionContext !== 'employee' && permissionContext !== 'display' && (
      <>
       {order.manHours && order.manHours.hours ? (
        <td>{order.manHours.hours}</td>
       ) : null}
       <td>
        {order.manHours
         ? (order.manHours.price + order.price).toFixed(2)
         : order.price
         ? order.price.toFixed(2)
         : 0}
       </td>
      </>
     )}
    </tr>
   </tbody>
  </Table>
 );
};

Summary.propTypes = {
 order: PropTypes.instanceOf(Object),
};

export default withContext(Summary);
