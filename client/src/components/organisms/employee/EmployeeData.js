import React from 'react';
// import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Row from 'templates/FlexRowTemplate';
import { StyledH3 as Heading } from 'components/atoms/heading/Headings';
import { dateToString } from 'utils/functions/date';

const StyledWrapper = styled.div`
 width: 300px;
 margin-right: 100px;
 &:last-of-type {
  margin-right: 0;
 }
`;

const StyledSpan = styled.span`
 font-weight: bold;
`;

const StyledRow = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 @media (max-width: 600px) {
  justify-content: 'center';
 }
`;

const EmployeeData = () => {
 const data = useSelector(state => state.employees.employee);
 return (
  <Row justify="flex-start">
   <StyledWrapper>
    <Heading>Dane pracownika</Heading>
    <StyledRow>
     <p>Imię: </p>
     <div>
      <strong>{data.firstname}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>Nazwisko: </p>
     <div>
      <strong>{data.surname}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>E-mail: </p>
     <div>
      <strong>{data.email}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>Data dodania: </p>
     <div>
      <strong>{dateToString(data.addDate)}</strong>
     </div>
    </StyledRow>
    <Heading>Wynagrodzenie</Heading>
    <div>
     <p>
      Stawka godzinowa: <strong>{data.earnings || '0'}</strong>
      <small>zł/h</small>
     </p>
    </div>
   </StyledWrapper>
   <StyledWrapper>
    <Heading>Stanowiska</Heading>
    <div>
     <ul>
      {data.positions &&
       data.positions.map(item => (
        <li key={item}>
         <StyledSpan className={item}>{item}</StyledSpan>
        </li>
       ))}
     </ul>
    </div>
   </StyledWrapper>
  </Row>
 );
};

// EmployeeData.propTypes = {};

export default EmployeeData;
