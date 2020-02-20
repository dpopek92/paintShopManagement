import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Row from 'templates/FlexRowTemplate';
import { dateToString } from 'utils/functions/date';
import withContext from 'hoc/withContext';

const StyledTable = styled(Table)`
 max-width: 500px;
 margin: 10px auto;
 thead {
  tr {
   th,
   td {
    text-align: left;
   }
  }
 }
 @media (max-width: 600px) {
  max-width: 90%;
  margin: 10px auto;
 }
`;

const OrderData = ({ permissionContext: permission, order }) => {
 const paintTypeStyle = { backgroundColor: '#0080FF', color: 'white' };
 let finishDate;
 if (permission === 'user') {
  finishDate = order.finishDate;
 } else {
  finishDate = order.productionFinishDate
   ? order.productionFinishDate
   : order.finishDate;
 }

 const status = order.productionStatus
  ? order.productionStatus.trim().split(' ')
  : [order.status];

 return (
  <Row justify="space-between">
   <StyledTable striped bordered hover size="sm">
    <thead>
     {order.veneerSymbol ? (
      <tr>
       <th>Rodzaj forniru: </th>
       <td> {order.veneerSymbol !== '' && order.veneerSymbol}</td>
      </tr>
     ) : null}
     <tr>
      <th>Kolor: </th>
      <td> {order.color}</td>
     </tr>
     <tr>
      <th>Matowość: </th>
      <td style={order.paintType === 'Połysk' ? paintTypeStyle : null}>
       {order.paintType}
      </td>
     </tr>
     <tr>
      <th>Lakierowanie: </th>
      <td> {order.paintStyle}</td>
     </tr>
    </thead>
   </StyledTable>
   {(order.millingSymbol ||
    order.glassCaseSymbol ||
    order.handleSymbol1 ||
    order.handleSymbol2) && (
    <StyledTable striped bordered hover size="sm">
     <thead>
      {order.millingSymbol ? (
       <tr>
        <th>Rodzaj frezowania: </th>
        <td>
         {' '}
         {order.millingSymbol !== '' && order.millingSymbol.toUpperCase()}
        </td>
       </tr>
      ) : null}
      {order.glassCaseSymbol ? (
       <tr>
        <th>Rodzaj Witryny: </th>
        <td>
         {order.glassCaseSymbol !== '' && order.glassCaseSymbol.toUpperCase()}
        </td>
       </tr>
      ) : null}
      {order.handleSymbol1 ? (
       <tr>
        <th>Rodzaj uchwytu(1): </th>
        <td>
         {' '}
         {order.handleSymbol1 !== '' && order.handleSymbol1.toUpperCase()}
        </td>
       </tr>
      ) : null}
      {order.handleSymbol2 ? (
       <tr>
        <th>Rodzaj uchwytu(2): </th>
        <td>
         {order.handleSymbol2 !== '' && order.handleSymbol2.toUpperCase()}
        </td>
       </tr>
      ) : null}
     </thead>
    </StyledTable>
   )}
   <StyledTable striped bordered size="sm" className="order__data--table">
    <thead>
     {order.date && permission !== 'employee' && permission !== 'display' && (
      <tr>
       <th>Data złożenia: </th>
       <td>{dateToString(order.date)}</td>
      </tr>
     )}
     {order.finishDate && (
      <tr>
       <th>Przewidywana data realizacji: </th>
       <td
        title={
         permission === 'admin'
          ? `Data dla klienta: ${dateToString(order.finishDate)}`
          : null
        }
       >
        {' '}
        {dateToString(finishDate)}
       </td>
      </tr>
     )}

     {order.status && (
      <tr>
       <th>Status: </th>
       <td style={{ fontWeight: 'bold' }}>
        {status
         ? status.map(item => (
            <span className={`${item} productionStatus`} key={item}>
             {item}{' '}
            </span>
           ))
         : order.status}
       </td>
      </tr>
     )}
    </thead>
   </StyledTable>

   <StyledTable striped bordered hover size="sm">
    <thead>
     <tr>
      <th>Typ zamówienia:</th>
      <td>{order.orderType ? order.orderType : 'Nowe zamówienie'}</td>
     </tr>
     {order.comments ? (
      <>
       <tr>
        <th>Uwagi:</th>
        <td>{order.comments}</td>
       </tr>
      </>
     ) : null}
    </thead>
   </StyledTable>
  </Row>
 );
};

OrderData.propTypes = {
 permissionContext: PropTypes.string,
 order: PropTypes.instanceOf(Object),
};

export default withContext(OrderData);
