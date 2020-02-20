import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import styled from 'styled-components';
import EmployeesList from 'components/molecules/statistics/production/EmployeesList';
import DailyTable from 'components/molecules/statistics/DailyTable';
import Orders from 'components/molecules/statistics/employee/Orders';

// const StyledHeader = styled.h1`
//  font-weight: bold;
//  letter-spacing: 3px;
//  color: ${({ theme, position }) => theme.positions[position]};
//  text-shadow: ${({ position }) =>
//   position === 'Podkład' ? '2px 2px 5px rgb(48, 48, 48)' : 'none'};
// `;

const PositionDailyStats = () => {
 const [values, setValues] = useState(null);
 const stats = useSelector(state => state.stats.productionStats);
 const position = useSelector(state => state.stats.activePosition);
 const activeDay = useSelector(state => state.stats.activeDay);

 // SET VALUES
 useEffect(() => {
  if (position && activeDay !== null && stats) {
   setValues(stats.days[activeDay][position.toLowerCase()]);
  }
 }, [position, activeDay, stats]);

 return (
  <div>
   {/* <StyledHeader position={position}>{position}</StyledHeader> */}
   {position !== 'Nowe' && position !== 'Odebrane' && values && (
    <EmployeesList employees={values.employees} />
   )}
   {values && (
    <>
     <DailyTable values={values} />
     {values.corrections ? (
      <h5>
       Zgłoszonych poprawek:
       <span style={{ color: 'red' }}> {values.corrections}</span>
      </h5>
     ) : null}
     {values.orders.length > 0 && (
      <Orders descriptions={values.orders} title="Zamówienia" />
     )}
    </>
   )}
  </div>
 );
};

// PositionDailyStats.propTypes = {};

export default PositionDailyStats;
