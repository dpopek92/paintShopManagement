import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

import styled from 'styled-components';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import PageTemplate from 'templates/PageTemplate';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import PositionCheckbox from 'components/organisms/timetable/PositionCheckbox';
import { positionsForTimetables, signal } from 'const/';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimetables, setTimetablePositions } from 'actions/timetable';
import { setSpinner } from 'actions/view';
import PositionTimetable from 'components/organisms/timetable/PositionTimetable';
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import OrderProductionPlan from 'components/organisms/modals/timetable/OrderProductionPlan';
import OrderProductionEditPlan from 'components/organisms/modals/timetable/OrderProductionEditPlan';

const StyledWrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 flex-wrap: wrap;
`;

const Timetable = () => {
 const history = useHistory();
 const dispatch = useDispatch();
 const timetables = useSelector(state => state.timetable.timetables);
 const positions = useSelector(state => state.timetable.positions);

 // display
 const [isProductionPlan, setIsProductionPlan] = useState(false);
 const [isEditPlan, setIsEditPlan] = useState(false);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(
   getAllTimetables(signal.token, () => {
    dispatch(setSpinner(false));
   }),
  );
 }, []);

 const handlePosition = e => {
  const { value, checked } = e.target;
  return checked
   ? dispatch(setTimetablePositions(value, true))
   : dispatch(setTimetablePositions(value, false));
 };

 const handleDay = day => {
  const date = new Date(day.date).getTime();
  history.push(`/timetable/${date}`, day);
 };
 const handleProductionPlan = () => setIsProductionPlan(!isProductionPlan);
 const handleEditPlan = () => setIsEditPlan(!isEditPlan);

 return (
  <>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <Row justify="space-between">
       <Heading>Planowanie</Heading>
       <div>
        <Row justify="flex-end">
         <Button variant="outline-secondary" onClick={handleEditPlan}>
          Edytuj produkcję
         </Button>
         <Button onClick={handleProductionPlan}>Zaplanuj produkcję</Button>
        </Row>
       </div>
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
      {timetables.length ? (
       <StyledWrapper>
        {Object.keys(positions).map(position => {
         const dataIndex = timetables
          .map(item => item.position)
          .indexOf(position);
         return (
          positions[position] && (
           <PositionTimetable
            key={position}
            position={position}
            data={timetables[dataIndex]}
            handleDay={handleDay}
           />
          )
         );
        })}
       </StyledWrapper>
      ) : null}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
   {/* MODALS */}
   {isProductionPlan && (
    <OrderProductionPlan closeModal={() => setIsProductionPlan(false)} />
   )}
   {isEditPlan && (
    <OrderProductionEditPlan
     closeModal={() => setIsEditPlan(false)}
     timetables={timetables}
    />
   )}
  </>
 );
};

// Timetable.propTypes = {};

export default Timetable;
