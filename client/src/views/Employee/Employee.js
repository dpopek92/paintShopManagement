import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import Row from 'templates/FlexRowTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Data from 'components/organisms/employee/EmployeeData';
import EmployeeRemove from 'components/organisms/modals/employees/EmployeeRemove';
import PositionUpdate from 'components/organisms/modals/employees/PositionUpdate';
import { setSpinner } from 'actions/view';
import { loadEmployee } from 'actions/employees';
import { signal } from 'const/';
import { setActiveEmployee } from 'actions/stats';
import { withRouter } from 'react-router';
import EmployeeEarnings from 'components/organisms/modals/employees/EmployeeEarnings';

const Employee = ({ match, history }) => {
 const dispatch = useDispatch();
 const employeeData = useSelector(state => state.employees.employee);
 const employeeId = match.params.id;
 // display
 const [isEmployeeRemove, setIsEmployeeRemove] = useState(false);
 const [isPositionsUpdate, setIsPositionsUpdate] = useState(false);
 const [isEmployeeEarnings, setIsEmployeeEarnings] = useState(false);

 // GET DATA
 useEffect(() => {
  if (!employeeData || (employeeData && employeeData._id !== employeeId)) {
   dispatch(setSpinner(true));
   dispatch(
    loadEmployee(employeeId, () => dispatch(setSpinner(false)), signal.token),
   );
  }
 }, []);

 // HANDLERS
 const handleEmployeeRemove = () => setIsEmployeeRemove(true);
 const handlePositionUpdate = () => setIsPositionsUpdate(true);
 const handleEmployeeEarnings = () => setIsEmployeeEarnings(true);
 const handleGoToStats = () => {
  dispatch(setActiveEmployee(employeeId));
  history.push('/statistics/employees');
 };

 return (
  <>
   <PageTemplate>
    {employeeData && (
     <FullWidthTemplate>
      <>
       <Row justify="space-between">
        <Heading>{`${employeeData.firstname} ${employeeData.surname}`}</Heading>
        <div>
         <Button variant="danger" onClick={handleEmployeeRemove}>
          Usuń pracownika
         </Button>
         <Button variant="secondary" onClick={handleEmployeeEarnings}>
          Ustal wynagrodzenie
         </Button>
         <Button variant="outline-dark" onClick={handlePositionUpdate}>
          Edytuj stanowiska
         </Button>
         <Button variant="primary" onClick={handleGoToStats}>
          Wyświetl statystyki
         </Button>
        </div>
       </Row>
       <Data />
      </>
     </FullWidthTemplate>
    )}
   </PageTemplate>
   {/* MODALS */}
   {isEmployeeRemove && (
    <EmployeeRemove
     closeModal={() => setIsEmployeeRemove(false)}
     employeeId={employeeId}
    />
   )}
   {isPositionsUpdate && (
    <PositionUpdate
     closeModal={() => setIsPositionsUpdate(false)}
     employeeId={employeeId}
    />
   )}
   {isEmployeeEarnings && (
    <EmployeeEarnings
     closeModal={() => setIsEmployeeEarnings(false)}
     employeeId={employeeId}
    />
   )}
  </>
 );
};

// Employee.propTypes = {};

export default withRouter(Employee);
