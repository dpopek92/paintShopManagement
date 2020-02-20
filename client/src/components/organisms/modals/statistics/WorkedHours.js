import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledH6 as Heading } from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import Modal from 'components/molecules/modal/Modal';
import { Form, Button } from 'react-bootstrap';
import { getWorkedHours } from 'utils/apiHandlers/statistics/get';
import { months } from 'const';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'actions/view';
import { updateWorkedHours } from 'utils/apiHandlers/statistics/update';
import { isObjectEmpty } from 'utils/functions/objects';

const StyledWrapper = styled.div`
 width: 40%;
`;
const StyledRow = styled.div`
 display: flex;
 justify-content: space-between;
 margin-bottom: 5px;
 input {
  width: 80px;
 }
`;

const WorkedHours = ({ closeModal }) => {
 const dispatch = useDispatch();
 const [employees, setEmployees] = useState({});
 const [activeYear, setActiveYear] = useState('');
 const [activeMonth, setActiveMonth] = useState('');

 useEffect(() => {
  const getData = async (year, month) => {
   dispatch(setSpinner(true));
   const newEmployees = {};
   const data = await getWorkedHours(year, month);
   data.forEach(item => {
    if (item.employee) {
     const obj = {
      name: `${item.employee.firstname} ${item.employee.surname}`,
      workedHours: item.workedHours,
     };
     newEmployees[item._id] = obj;
    }
   });
   setEmployees(newEmployees);
   dispatch(setSpinner(false));
   return data;
  };
  if ((activeYear, activeMonth)) {
   getData(activeYear, activeMonth);
  }
 }, [activeYear, activeMonth]);

 //  HANDLERS
 const handleYear = e => setActiveYear(e.target.value);
 const handleMonth = e => setActiveMonth(e.target.value);
 const handleHours = (e, key) => {
  const { value } = e.target;
  const newEmployees = employees;
  newEmployees[key].workedHours = value;
  setEmployees({
   ...employees,
   [key]: { ...employees[key], workedHours: parseInt(value, 10) || 0 },
  });
 };
 const handleSubmit = async () => {
  dispatch(setSpinner(true));
  await updateWorkedHours(activeYear, activeMonth, employees, () => {
   dispatch(setSpinner(false));
   closeModal();
  });
 };

 return (
  <Modal closeModal={closeModal} title="Czas pracy">
   <Heading>Data:</Heading>
   <Row justify="space-between">
    <StyledWrapper>
     {' '}
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
   <hr />
   {employees.length !== 0 && (
    <>
     {Object.keys(employees).map(key => {
      const obj = employees[key];
      return (
       <StyledRow key={key}>
        <h6>{obj.name}</h6>
        <Form.Control
         type="text"
         value={obj.workedHours}
         onChange={e => handleHours(e, key)}
        />
       </StyledRow>
      );
     })}
    </>
   )}
   <hr />
   <Row justify="flex-end">
    <Button
     variant="success"
     onClick={handleSubmit}
     disabled={isObjectEmpty(employees)}
    >
     Zatwierdź
    </Button>
    <Button variant="danger" onClick={closeModal}>
     Anuluj
    </Button>
   </Row>
  </Modal>
 );
};

WorkedHours.propTypes = {
 closeModal: PropTypes.func,
};

export default WorkedHours;
