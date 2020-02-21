import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import PositionCheckbox from 'components/organisms/timetable/PositionCheckbox';
import { positionsForTimetables } from 'const/';
import { useDispatch, useSelector } from 'react-redux';
import {
 setTimetablePositions,
 unsetTimetableActiveDay,
 setTimetableActiveDay,
 removeOrderFromActiveDay,
 moveOrderInActiveDay,
 addOrderToActiveDay,
} from 'actions/timetable';
import { dateToString } from 'utils/functions/date';
import PositionTimetableDay from 'components/organisms/timetable/PositionTimetableDay';

const StyledDay = styled.h1`
 margin: 0 10px;
 color: ${({ dayName }) => {
  if (dayName === 'Niedziela') return 'red';
  if (dayName === 'Sobota') return 'green';
  return 'black';
 }};
`;

const TimetableDay = ({ location }) => {
 const dispatch = useDispatch();
 const positions = useSelector(state => state.timetable.positions);
 const activeDay = useSelector(state => state.timetable.activeDay);
 const { state } = location;

 useEffect(() => {
  dispatch(setTimetableActiveDay(state.date, state.day));
  return () => {
   dispatch(unsetTimetableActiveDay());
  };
 }, []);

 const handlePosition = e => {
  const { value, checked } = e.target;
  return checked
   ? dispatch(setTimetablePositions(value, true))
   : dispatch(setTimetablePositions(value, false));
 };

 const handleRemoveOrder = (position, orderId) => {
  dispatch(removeOrderFromActiveDay(position, orderId));
 };
 const handleMoveOrder = (position, way, index) => {
  dispatch(moveOrderInActiveDay(position, way, index));
 };
 const handleAddOrder = (position, order) => {
  dispatch(addOrderToActiveDay(position, order));
 };
 return (
  <>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Row justify="flex-start">
       <Heading>Planowanie:</Heading>
       <StyledDay dayName={state.day}>
        {state.day}, {dateToString(state.date)}
       </StyledDay>
      </Row>
      <Row justify="space-around">
       {positionsForTimetables.map(position => (
        <PositionCheckbox
         key={position}
         position={position}
         positions={positions}
         onchange={handlePosition}
        />
       ))}
      </Row>
      <hr />
      {activeDay.length ? (
       <>
        {Object.keys(positions).map(position => {
         const dataIndex = activeDay
          .map(item => item.position)
          .indexOf(position);
         return (
          positions[position] && (
           <PositionTimetableDay
            key={position}
            position={position}
            data={activeDay[dataIndex]}
            handleRemoveOrder={handleRemoveOrder}
            handleMoveOrder={handleMoveOrder}
            handleAddOrder={handleAddOrder}
           />
          )
         );
        })}
       </>
      ) : null}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
  </>
 );
};

TimetableDay.propTypes = {};

export default TimetableDay;
