import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { dateToString } from 'utils/functions/date';

const StyledWrapper = styled.div`
 width: 100%;
 min-height: 200px;
 margin-bottom: 5px;
 border-radius: 5px;
 border: 1px solid lightgray;
 background-color: ${({ dayName }) => {
  if (dayName === 'Niedziela') return '#fff0f0';
  if (dayName === 'Sobota') return '#f0fff1';
  return '#f0f0f0';
 }};
 transition: transform 0.2s;
 &:hover {
  cursor: pointer;
  transform: scale(1.05);
 }
 @media (max-width: 600px) {
  margin: 10px 0;
  transform: none;
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
 height: 260px;
 overflow-y: auto;
`;
const StyledBottom = styled.div`
 padding: 5px;
 border-top: 1px solid lightgray;
 display: flex;
 justify-content: space-between;
 span {
  font-weight: bold;
 }
`;
const StyledList = styled.ul`
 padding-left: 20px;
 margin: 0;
`;

const DayCard = ({ day, handleDay, position }) => {
 const { orders } = day;

 const CNC = orders.reduce((acc, order) => acc + order.surfaceCNC, 0);
 const PL = orders.reduce((acc, order) => acc + order.surfaceRight, 0);
 const PP = orders.reduce((acc, order) => acc + order.surfaceLeft, 0);
 const elements = orders.reduce((acc, order) => acc + order.elements, 0);

 return (
  <StyledWrapper dayName={day.day} onClick={() => handleDay(day)}>
   <StyledTop>
    <span>{dateToString(day.date)}</span>
    <StyledSpan dayName={day.day}>{day.day}</StyledSpan>
   </StyledTop>
   <StyledContent>
    <StyledList>
     {orders.length
      ? orders.map(order => {
         const status = order.productionStatus
          ? order.productionStatus.split(' ')
          : [order.status];

         return (
          <li key={order._id}>
           {order.user.company}-{order.user.firstname[0]} nr.{order.number} -{' '}
           {status.map(item => (
            <span key={item} className={item} style={{ fontWeight: 'bold' }}>
             {item}{' '}
            </span>
           ))}
          </li>
         );
        })
      : null}
    </StyledList>
   </StyledContent>
   <StyledBottom>
    <small>
     {position !== 'Pakowanie' ? (
      <>
       <span>CNC: </span>
       {CNC.toFixed(1)}
      </>
     ) : (
      <>
       <span>Elem: </span>
       {elements}
      </>
     )}
     <span>, PL: </span>
     {PL.toFixed(1)}
     <span>, PP: </span>
     {PP.toFixed(1)}
    </small>
    <div>
     <span>Σ: </span>
     {(PL + PP).toFixed(1)}
    </div>
   </StyledBottom>
  </StyledWrapper>
 );
};

DayCard.propTypes = {
 day: PropTypes.instanceOf(Object),
};

export default DayCard;
