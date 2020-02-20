import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DayCard from 'components/molecules/timetables/DayCard';

const StyledWrapper = styled.div`
 margin-bottom: 20px;
 width: 240px;
 @media (max-width: 600px) {
  width: 100vw;
  margin: 10px 0;
 }
`;
const StyledHeading = styled.h1`
 font-weight: bold;
 letter-spacing: 3px;
 color: ${({ theme, pos }) => theme.positions[pos]};
 text-shadow: ${({ pos }) =>
  pos === 'Podkład' ? '2px 2px 5px rgb(48, 48, 48)' : 'none'};
`;

const StyledColumn = styled.div`
 display: flex;
 flex-direction: column;
`;

const PositionTimetable = ({ position, data, ...props }) => {
 return (
  <StyledWrapper>
   <StyledHeading pos={position}>{position}</StyledHeading>
   <StyledColumn>
    {data.days.map(day => (
     <DayCard day={day} key={day._id} {...props} position={position} />
    ))}
   </StyledColumn>
  </StyledWrapper>
 );
};

PositionTimetable.propTypes = {
 position: PropTypes.string,
 data: PropTypes.instanceOf(Object),
};

export default PositionTimetable;
