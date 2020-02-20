import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { dateToString } from 'utils/functions/date';
import { useHistory } from 'react-router';

const StyledWrapper = styled.div`
 width: 260px;
 min-height: 300px;
 margin: 3px;
 border-radius: 5px;
 border: 1px solid lightgray;
 background-color: ${({ dayName }) => {
  if (dayName === 'Niedziela') return '#fff0f0';
  if (dayName === 'Sobota') return '#f0fff1';
  return '#f0f0f0';
 }};
 @media (max-width: 600px) {
  width: 100%;
  margin: 10px 0;
 }
`;
const StyledTop = styled.div`
 border-bottom: 1px solid lightgray;
 padding: 5px;
 display: flex;
 justify-content: space-between;
`;
const StyledSpan = styled.span`
 font-weight: bold;
 color: ${({ dayName }) => {
  if (dayName === 'Niedziela') return 'red';
  if (dayName === 'Sobota') return 'green';
  return 'black';
 }};
`;
const StyledContent = styled.div`
 height: 300px;
 overflow-y: auto;
`;

const TransportDayView = ({ day, position }) => {
 const history = useHistory();
 const { orders } = day;
 return (
  <StyledWrapper pos={position} dayName={day.day}>
   <StyledTop>
    <span>{dateToString(day.date)}</span>
    <StyledSpan dayName={day.day}>{day.day}</StyledSpan>
   </StyledTop>
   <StyledContent>
    <Table bordered>
     <thead>
      <tr>
       <th>LP</th>
       <th>Klient</th>
       <th>Nr</th>
       <th>Elementy</th>
      </tr>
     </thead>
     <tbody>
      {orders.length
       ? orders.map((order, index) => (
          <tr
           key={order._id}
           style={{ cursor: 'pointer' }}
           onClick={() => history.push(`/order/${order._id}`)}
          >
           <td>{index + 1}</td>
           <td>{order.user.company}</td>
           <td>{order.number}</td>
           <td>{order.elements}</td>
          </tr>
         ))
       : null}
     </tbody>
    </Table>
   </StyledContent>
  </StyledWrapper>
 );
};

TransportDayView.propTypes = {};

export default TransportDayView;
