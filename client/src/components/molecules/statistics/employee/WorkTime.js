import React from "react";
import PropTypes from "prop-types";
import { dateToStringWithHour } from "utils/functions/date";

const WorkTime = ({ values }) => {
 return (
  <div style={{ marginBottom: 20 }}>
   {values.timeStart && (
    <>
     Data rozpoczęcia pierwszego zlecenia:{" "}
     <strong>{dateToStringWithHour(values.timeStart)}</strong>
    </>
   )}
   <br />
   {values.timeStop && (
    <>
     Data zakończenia ostatniego zlecenia:{" "}
     <strong>{dateToStringWithHour(values.timeStop)}</strong>
    </>
   )}
  </div>
 );
};

WorkTime.propTypes = {
 values: PropTypes.object
};

export default WorkTime;
