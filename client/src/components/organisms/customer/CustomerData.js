/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Row from 'templates/FlexRowTemplate';
import { StyledH3 as Heading } from 'components/atoms/heading/Headings';

const StyledWrapper = styled.div`
 width: 300px;
 margin-right: 100px;
 &:last-of-type {
  margin-right: 0;
 }
`;
const StyledHeader = styled.h2`
 color: ${({ theme }) => theme.blowDanger};
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

const CustomerData = ({ data }) => {
 return (
  <Row justify="flex-start">
   <StyledWrapper>
    {data.permission === 'DELETED' && (
     <StyledHeader>Użytkownik usunął swoje konto</StyledHeader>
    )}
    <Heading>Dane klienta</Heading>
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
     <p>Nr telefonu: </p>
     <div>
      <strong>{data.phone}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>Nazwa firmy: </p>
     <div>
      <strong>{data.company}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>NIP: </p>
     <div>
      <strong>{data.NIP}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>Kod pocztowy: </p>
     <div>
      <strong>{data.postcode}</strong>
     </div>
    </StyledRow>
    <StyledRow>
     <p>Miejscowość: </p>
     <div>
      <strong>{data.city}</strong>
     </div>
    </StyledRow>
   </StyledWrapper>
   <StyledWrapper>
    <Heading>Podwładni</Heading>
    <div>
     <ul>
      {data.subordinates &&
       data.subordinates.map(item => (
        <li key={item.id}>
         <StyledSpan>{item.name}</StyledSpan>
        </li>
       ))}
     </ul>
    </div>
   </StyledWrapper>
  </Row>
 );
};

CustomerData.propTypes = {
 data: PropTypes.object,
};

export default CustomerData;
