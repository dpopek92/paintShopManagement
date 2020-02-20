import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import TransportDayView from 'components/molecules/timetables/TransportDayView';

const StyledWrapper = styled.div`
 display: flex;
 flex-wrap: wrap;
`;

const TransportTimetables = ({ position }) => {
 const timetable = useSelector(state => state.timetable.timetables);

 return timetable.days ? (
  <StyledWrapper>
   {timetable.days.map(day => (
    <TransportDayView day={day} key={day._id} position={position} />
   ))}
  </StyledWrapper>
 ) : null;
};

TransportTimetables.propTypes = { position: PropTypes.string };

export default TransportTimetables;
