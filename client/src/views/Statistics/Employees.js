/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import { Form, Button } from 'react-bootstrap';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Buttons from 'components/molecules/statistics/Buttons';
import Date from 'components/molecules/statistics/date/Container';
import { setSpinner } from 'actions/view';
import {
 setActiveYear,
 setActiveMonth,
 getEmployeeStatsYears,
 setActiveEmployee,
 getEmployeeStats,
} from 'actions/stats';
import { signal, currentDate } from 'const';
import PositionSummary from 'components/organisms/statistics/PositionSummary';
import PositionDailyStats from 'components/organisms/statistics/employee/PositionDailyStats';
import { loadEmployees } from 'actions/employees';
import { withRouter } from 'react-router';
import { faFile, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WorkedHours from 'components/organisms/modals/statistics/WorkedHours';
import GetEmployeesReport from 'components/organisms/modals/statistics/GetEmployeesReport';

const positions = ['Blow', 'Nowe', 'Odebrane'];
const StyledHeader = styled.h1`
 font-weight: bold;
 letter-spacing: 3px;
 text-shadow: ${({ position }) =>
  position === 'Podkład' ? '2px 2px 5px rgb(48, 48, 48)' : 'none'};
`;
const StyledSpan = styled.span`
 cursor: pointer;
 color: ${({ theme, position }) =>
  !positions.includes(position) ? theme.positions[position] : 'black'};
 &:hover {
  color: ${({ theme, position }) =>
   !positions.includes(position)
    ? darken(0.2, theme.positions[position])
    : 'black'};
 }
`;
const StyledSelectWrapper = styled(Form.Group)`
 label {
  font-weight: bold;
 }
 select {
  width: 300px;
 }
 @media (max-width: 600px) {
  select {
   width: 100%;
  }
 }
`;

const Employees = ({ history }) => {
 const dispatch = useDispatch();
 const employees = useSelector(state => state.employees.list);
 const stats = useSelector(state => state.stats);
 const {
  years,
  activeDay,
  activeYear,
  activeMonth,
  activeEmployee,
  activePosition,
  employeeStats,
 } = stats;
 // display
 const [isWorkedHours, setIsWorkedHours] = useState(false);
 const [isGetReport, setIsGetReport] = useState(false);

 // GET EMPLOYEES
 useEffect(() => {
  if (!employees) {
   dispatch(setSpinner(true));
   dispatch(loadEmployees(() => dispatch(setSpinner(false)), signal.token));
  }
 }, []);

 // GET YEARS & SET DATE
 useEffect(() => {
  if (activeEmployee) {
   dispatch(setSpinner(true));
   dispatch(
    getEmployeeStatsYears(
     activeEmployee,
     () => {
      dispatch(setSpinner(false));
      if (!activeYear) dispatch(setActiveYear(currentDate.getFullYear()));
      if (!activeMonth) dispatch(setActiveMonth(currentDate.getMonth() + 1));
     },
     signal.token,
    ),
   );
  }
 }, [activeEmployee]);

 // GET EMPLOYEE STATS
 useEffect(() => {
  if (activeYear && activeMonth && activeEmployee) {
   dispatch(setSpinner(true));
   dispatch(
    getEmployeeStats(
     activeYear,
     activeMonth,
     activeEmployee,
     () => {
      dispatch(setSpinner(false));
     },
     signal.token,
    ),
   );
  }
 }, [activeYear, activeMonth, activeEmployee]);

 // HANDLERS
 const handleSort = (a, b) => a.firstname.localeCompare(b.firstname);
 const handleSelect = e => dispatch(setActiveEmployee(e.target.value));
 const handleWorkedHours = () => setIsWorkedHours(true);
 const handleGetReport = () => setIsGetReport(true);

 return (
  <>
   <FullWidthTemplate>
    <>
     <Row justify="space-between">
      <Heading>Statystyki pracowników</Heading>
      <div>
       <Button variant="outline-dark" onClick={handleWorkedHours}>
        <FontAwesomeIcon icon={faClock} /> Czas pracy
       </Button>
       <Button onClick={handleGetReport}>
        <FontAwesomeIcon icon={faFile} /> Pobierz raport
       </Button>
      </div>
     </Row>
     <StyledSelectWrapper controlId="employeesStatsSelect">
      <Form.Label>Pracownicy</Form.Label>
      <Form.Control as="select" onChange={handleSelect} value={activeEmployee}>
       <option value="" />
       {employees &&
        employees
         .sort(handleSort)
         .map(item => (
          <option
           key={item._id}
           value={item._id}
          >{`${item.firstname} ${item.surname}`}</option>
         ))}
      </Form.Control>
     </StyledSelectWrapper>

     <hr />
     <Buttons view="employee" />
     <hr />
     {years && (
      <>
       <Date stats={employeeStats} view="employee" />
       <hr />
      </>
     )}
     {activePosition && !positions.includes(activePosition) && (
      <StyledHeader position={activePosition}>
       <StyledSpan
        position={activePosition}
        onClick={() => history.push(`/statistics/production`)}
       >
        {activePosition}
       </StyledSpan>
      </StyledHeader>
     )}
     {employeeStats &&
      activeEmployee &&
      activePosition &&
      !positions.includes(activePosition) &&
      activeMonth &&
      activeDay === null && (
       <PositionSummary values={employeeStats} view="employee" />
      )}
     {activePosition &&
      !positions.includes(activePosition) &&
      activeMonth &&
      activeDay !== null && <PositionDailyStats />}
    </>
   </FullWidthTemplate>
   {/* MODALS */}
   {isWorkedHours && <WorkedHours closeModal={() => setIsWorkedHours(false)} />}
   {isGetReport && (
    <GetEmployeesReport closeModal={() => setIsGetReport(false)} />
   )}
  </>
 );
};

// Employees.propTypes = {};

export default withRouter(Employees);
