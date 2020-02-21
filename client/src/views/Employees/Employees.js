import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import PageTemplate from 'templates/AuthPageTemplate';
import { StyledH1 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import List from 'components/molecules/employeesList/List';
import AddEmployee from 'components/organisms/modals/employees/AddEmploye';
import { setSpinner } from 'actions/view';
import { loadEmployees } from 'actions/employees';
import { signal } from 'const/';

const Employees = () => {
 const dispatch = useDispatch();
 const employees = useSelector(state => state.employees.list);
 const [isAddEmployee, setIsAddEmployee] = useState(false);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(loadEmployees(() => dispatch(setSpinner(false)), signal.token));
 }, []);

 // HANDLERS
 const handleAddEmployee = () => setIsAddEmployee(true);

 return (
  <>
   <PageTemplate>
    <FullWidthTemplate>
     <>
      <Row justify="space-between">
       <Heading>Pracownicy</Heading>
       <div>
        <Button variant="outline-primary" onClick={handleAddEmployee}>
         <FontAwesomeIcon icon={faUserPlus} /> Dodaj pracownika
        </Button>
       </div>
      </Row>
      {employees && <List />}
     </>
    </FullWidthTemplate>
   </PageTemplate>
   {/* MODALS */}
   {isAddEmployee && <AddEmployee closeModal={() => setIsAddEmployee(false)} />}
  </>
 );
};

// Employees.propTypes = {};

export default Employees;
