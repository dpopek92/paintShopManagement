import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const StyledH1 = styled.h1`
 font-weight: bold;
 margin: 20px 10px;
 color: ${({ theme, variant }) =>
  variant === 'green' ? `${theme.blowGreen}` : `${theme.blowDark}`};
`;
const StyledH2 = styled.h2`
 margin: 10px;
 color: ${({ theme, variant }) =>
  variant === 'green' ? `${theme.blowGreen}` : `${theme.blowInfo}`};
`;

const DailyTable = ({ values }) => {
 const sum =
  values.flatOneSide +
  values.flatBothSides +
  values.cncOneSide +
  values.cncBothSides;

 return (
  <div className="section">
   {sum ? (
    <>
     <h4>Liczby:</h4>
     <Table striped bordered responsive>
      <tbody>
       <tr>
        <th rowSpan={2} className="rowTitle">
         <StyledH1 variant="green">Płaskie</StyledH1>
        </th>
        <th>Jednostronne</th>
        <td>
         {values.flatOneSide ? values.flatOneSide.toFixed(2) : '0'}{' '}
         <small>
          m<sup>2</sup>
         </small>
        </td>
        <th rowSpan={2}>
         <StyledH2 variant="green">
          {(values.flatOneSide + values.flatBothSides).toFixed(2)}{' '}
          <small>
           m<sup>2</sup>
          </small>
         </StyledH2>
        </th>
        <th rowSpan={5}>
         <StyledH2>
          {sum.toFixed(2)}{' '}
          <small>
           m<sup>2</sup>
          </small>
         </StyledH2>
        </th>
       </tr>
       <tr>
        <th>Obustronne</th>
        <td>
         {values.flatBothSides ? values.flatBothSides.toFixed(2) : '0'}{' '}
         <small>
          m<sup>2</sup>
         </small>
        </td>
       </tr>
       <tr>
        <th rowSpan={2} className="rowTitle">
         <StyledH1>CNC</StyledH1>
        </th>
        <th>Jednostronne</th>
        <td>
         {values.cncOneSide ? values.cncOneSide.toFixed(2) : '0'}{' '}
         <small>
          m<sup>2</sup>
         </small>
        </td>
        <th rowSpan={2}>
         <StyledH2 variant="green">
          {(values.cncOneSide + values.cncBothSides).toFixed(2)}{' '}
          <small>
           m<sup>2</sup>
          </small>
         </StyledH2>
        </th>
       </tr>
       <tr>
        <th>Obustronne</th>
        <td>
         {values.cncBothSides ? values.cncBothSides.toFixed(2) : '0'}{' '}
         <small>
          m<sup>2</sup>
         </small>
        </td>
       </tr>
      </tbody>
     </Table>
    </>
   ) : (
    <h1 className="title--white">Brak danych</h1>
   )}
  </div>
 );
};

DailyTable.propTypes = {
 values: PropTypes.instanceOf(Object),
};

export default DailyTable;
