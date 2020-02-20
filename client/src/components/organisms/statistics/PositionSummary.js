import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import SummaryTable from 'components/molecules/statistics/SummaryTable';
import CorrectionsReasons from 'components/molecules/statistics/production/CorrectionsReasons';

// const StyledHeader = styled.h1`
//  font-weight: bold;
//  letter-spacing: 3px;
//  color: ${({ theme, position }) => theme.positions[position]};
//  text-shadow: ${({ position }) =>
//   position === 'Podkład' ? '2px 2px 5px rgb(48, 48, 48)' : 'none'};
// `;

const PositionSummary = ({ values, view }) => {
 const position = useSelector(state => state.stats.activePosition);
 //  console.log(values);
 return (
  <div>
   {values && (
    <>
     {/* <StyledHeader position={position}>{position}</StyledHeader> */}
     <SummaryTable values={values} view={view} />
     {view === 'production' &&
      position !== 'Nowe' &&
      position !== 'Odebrane' && <CorrectionsReasons values={values} />}
    </>
   )}
  </div>
 );
};

PositionSummary.propTypes = {
 values: PropTypes.instanceOf(Object),
 view: PropTypes.oneOf(['production', 'employee']),
};

export default PositionSummary;
