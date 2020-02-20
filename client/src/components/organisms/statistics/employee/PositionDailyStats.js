import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DailyTable from 'components/molecules/statistics/DailyTable';
import WorkTime from 'components/molecules/statistics/employee/WorkTime';
import Orders from 'components/molecules/statistics/employee/Orders';

const PositionDailyStats = () => {
 const [values, setValues] = useState(null);
 const stats = useSelector(state => state.stats.employeeStats);
 const position = useSelector(state => state.stats.activePosition);
 const activeDay = useSelector(state => state.stats.activeDay);

 // SET VALUES
 useEffect(() => {
  if (position && activeDay !== null && stats) {
   setValues(stats.days[activeDay][position.toLowerCase()]);
  }
 }, [position, activeDay, stats]);

 //  console.log(values);
 return (
  <div>
   {values && (
    <>
     <WorkTime values={values} />
     <DailyTable values={values} />
     {values.selfMadeOrders.length > 0 && (
      <Orders
       title="Zamówienia wykonane samodzielnie"
       descriptions={values.selfMadeOrders}
      />
     )}
     {values.notSelfMadeOrders.length > 0 && (
      <Orders
       title="Zamówienia wykonane z innym pracownikiem"
       descriptions={values.notSelfMadeOrders}
      />
     )}
    </>
   )}
  </div>
 );
};

// PositionDailyStats.propTypes = {};

export default PositionDailyStats;
