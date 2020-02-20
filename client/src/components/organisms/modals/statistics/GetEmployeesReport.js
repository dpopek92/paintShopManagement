import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import { months, employeesPositions } from 'const';
import { setSpinner } from 'actions/view';
import { getMonthReport } from 'utils/apiHandlers/statistics/get';
import { getEmployeesFromPosition } from 'utils/apiHandlers/employees/get';

const StyledWrapper = styled.div`
 width: 40%;
 margin-bottom: 10px;
`;

const GetEmployeesReport = ({ closeModal }) => {
 const dispatch = useDispatch();
 const [activeYear, setActiveYear] = useState('');
 const [activeMonth, setActiveMonth] = useState('');
 const [activePosition, setActivePosition] = useState('');
 const [employees, setEmployees] = useState([]);
 const [employeesOnPosition, setEmployeesOnPosition] = useState([]);

 useEffect(() => {
  if (activePosition) {
   const getEmployees = async () => {
    dispatch(setSpinner(true));
    const data = await getEmployeesFromPosition(activePosition, () => {
     dispatch(setSpinner(false));
    });
    setEmployeesOnPosition(data);
   };
   getEmployees();
  }
 }, [activePosition]);

 //  HANDLERS
 const handleYear = e => setActiveYear(e.target.value);
 const handleMonth = e => setActiveMonth(e.target.value);
 const handlePosition = e => setActivePosition(e.target.value);
 const handleEmployees = e => {
  const { checked, value } = e.target;
  if (checked) {
   setEmployees(employees.concat(value));
  } else {
   const newEmployees = employees.filter(item => item !== value);
   setEmployees(newEmployees);
  }
 };
 const handleGetReport = async () => {
  dispatch(setSpinner(true));
  await getMonthReport(
   activeYear,
   activeMonth,
   activePosition,
   employees,
   () => {
    dispatch(setSpinner(false));
    //    closeModal();
   },
  );
 };

 //  console.log(employees);
 return (
  <Modal closeModal={closeModal} title="Pobierz raport">
   <Heading>Data:</Heading>
   <Row justify="space-between">
    <StyledWrapper>
     <Form.Control as="select" value={activeYear} onChange={handleYear}>
      <option value="" disabled>
       Rok
      </option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
     </Form.Control>
    </StyledWrapper>
    <StyledWrapper>
     {' '}
     <Form.Control as="select" value={activeMonth} onChange={handleMonth}>
      <option value="" disabled>
       Miesiąc
      </option>
      {months.map((item, index) => (
       <option key={item} value={index + 1}>
        {item}
       </option>
      ))}
     </Form.Control>
    </StyledWrapper>
   </Row>
   <Heading>Stanowisko:</Heading>
   <Form.Control
    style={{ marginBottom: 10 }}
    as="select"
    value={activePosition}
    onChange={handlePosition}
   >
    <option value="" disabled>
     Stanowisko
    </option>
    {employeesPositions.map(item => (
     <option
      key={item}
      value={item}
      className={item}
      style={{ fontWeight: 'bold' }}
     >
      {item}
     </option>
    ))}
   </Form.Control>
   {employeesOnPosition.length > 0 && (
    <>
     <Heading>Pracownicy</Heading>
     <Form.Group>
      {employeesOnPosition.map(item => {
       const name = `${item.firstname} ${item.surname}`;
       return (
        <Form.Check
         key={item._id}
         value={item._id}
         id={item._id}
         type="checkbox"
         // checked={positions.includes(item)}
         name={item}
         label={name}
         onChange={handleEmployees}
        />
       );
      })}
     </Form.Group>
    </>
   )}
   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     onClick={handleGetReport}
     disabled={
      !activeMonth || !activeYear || !activePosition || employees.length === 0
     }
    >
     Pobierz
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

GetEmployeesReport.propTypes = {
 closeModal: PropTypes.func,
};

export default GetEmployeesReport;
