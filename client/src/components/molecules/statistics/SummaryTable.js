/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledH3 as Heading } from 'components/atoms/heading/Headings';
import { Table } from 'react-bootstrap';

// const positions = ['Blow', 'Nowe', 'Odebrane'];
const StyledH3 = styled.h3`
 margin: 10px;
 color: ${({ theme, variant }) => {
  if (variant === 'green') return theme.blowGreen;
  if (variant === 'info') return theme.blowInfo;
  if (variant === 'warning') return theme.blowWarning;
  return theme.blowDark;
 }};
`;
const StyledH4 = styled.h4`
 margin: 10px;
 color: ${({ theme }) => theme.blowGreen};
`;

const SummaryTable = ({ values, view }) => {
 const [valuesSum, setValuesSum] = useState(null);
 const pos = useSelector(state => state.stats.activePosition);

 useEffect(() => {
  if (pos && values) {
   let flatOneSide = 0;
   let flatBothSides = 0;
   let cncOneSide = 0;
   let cncBothSides = 0;
   let corrections = 0;
   let correctionsSurface = 0;
   values.days.forEach(item => {
    if (item !== null) {
     const element = item[pos.toLowerCase()];
     flatOneSide += element.flatOneSide;
     flatBothSides += element.flatBothSides;
     cncOneSide += element.cncOneSide;
     cncBothSides += element.cncBothSides;
     if (view === 'production' && pos !== 'Nowe' && pos !== 'Odebrane') {
      corrections += element.corrections;
      correctionsSurface += element.correctionsData.surface;
     }
    }
   });
   setValuesSum({
    flatOneSide,
    flatBothSides,
    cncOneSide,
    cncBothSides,
    corrections,
    correctionsSurface,
   });
  }
 }, [pos, values]);

 return (
  <div>
   {values && pos && (
    <>
     <Heading>Liczby</Heading>
     <Table striped bordered responsive hover className="numbers">
      <tbody>
       <tr>
        <th colSpan={2}>Dni</th>
        {values.days.map((item, index) => (
         <th key={index}>{index + 1}</th>
        ))}
        <th colSpan={3}>Suma</th>
       </tr>
       <tr>
        <th rowSpan={2} className="rowTitle">
         <StyledH3 variant="green">Płaskie</StyledH3>
        </th>
        <th>Jednostronne</th>
        {values.days.map((item, index) => {
         const value = item && item[pos.toLowerCase()].flatOneSide;
         return (
          <td key={index} style={value === 0 ? { color: 'red' } : {}}>
           {value && pos ? value.toFixed(2) : ''}
          </td>
         );
        })}
        <th>{valuesSum && valuesSum.flatOneSide.toFixed(2)}</th>
        <th rowSpan={2}>
         <StyledH4>
          {valuesSum &&
           (valuesSum.flatOneSide + valuesSum.flatBothSides).toFixed(2)}{' '}
          <small>
           m<sup>2</sup>
          </small>
         </StyledH4>
        </th>
        <th rowSpan={5}>
         <StyledH3 variant="info">
          {valuesSum &&
           (
            valuesSum.flatOneSide +
            valuesSum.flatBothSides +
            valuesSum.cncOneSide +
            valuesSum.cncBothSides
           ).toFixed(2)}{' '}
          <small>
           m<sup>2</sup>
          </small>
         </StyledH3>
        </th>
       </tr>
       <tr>
        <th>Obustronne</th>
        {values.days.map((item, index) => {
         const value = item && item[pos.toLowerCase()].flatBothSides;
         return (
          <td key={index} style={value === 0 ? { color: 'red' } : {}}>
           {value && pos ? value.toFixed(2) : ''}
          </td>
         );
        })}
        <th>{valuesSum && valuesSum.flatBothSides.toFixed(2)}</th>
       </tr>
       <tr>
        <th rowSpan={2} className="rowTitle">
         <StyledH3>CNC</StyledH3>
        </th>
        <th>Jednostronne</th>
        {values.days.map((item, index) => {
         const value = item && item[pos.toLowerCase()].cncOneSide;
         return (
          <td key={index} style={value === 0 ? { color: 'red' } : {}}>
           {value && pos ? value.toFixed(2) : ''}
          </td>
         );
        })}
        <th>{valuesSum && valuesSum.cncOneSide.toFixed(2)}</th>
        <th rowSpan={2}>
         <StyledH4>
          {valuesSum &&
           (valuesSum.cncOneSide + valuesSum.cncBothSides).toFixed(2)}{' '}
          <small>
           m<sup>2</sup>
          </small>
         </StyledH4>
        </th>
       </tr>
       <tr>
        <th>Obustronne</th>
        {values.days.map((item, index) => {
         const value = item && item[pos.toLowerCase()].cncBothSides;
         return (
          <td key={index} style={value === 0 ? { color: 'red' } : {}}>
           {value && pos ? value.toFixed(2) : ''}
          </td>
         );
        })}
        <th>{valuesSum && valuesSum.cncBothSides.toFixed(2)}</th>
       </tr>
       <tr>
        <td colSpan={2}>
         <StyledH3 variant="warning">Suma</StyledH3>
        </td>
        {values.days.map((item, index) => {
         const obj = item && item[pos.toLowerCase()];
         const value =
          obj.cncBothSides +
          obj.cncOneSide +
          obj.flatBothSides +
          obj.flatOneSide;
         return (
          <td
           key={index}
           style={
            value === 0
             ? { color: 'red', fontWeight: 'bold' }
             : { fontWeight: 'bold' }
           }
          >
           {value ? value.toFixed(1) : ''}
          </td>
         );
        })}
        <td colSpan={2} />
       </tr>
       {view === 'production' && pos !== 'Nowe' && pos !== 'Odebrane' && (
        <>
         <tr>
          <th rowSpan={2}>Zgłoszonych poprawek</th>
          <th>Elementy</th>
          {values.days.map((item, index) => (
           <td key={index} style={{ color: 'red' }}>
            {item !== null && pos && item[pos.toLowerCase()].corrections
             ? item[pos.toLowerCase()].corrections
             : ' '}
           </td>
          ))}
          <th colSpan={3} style={{ color: 'red' }}>
           {valuesSum && valuesSum.corrections}
           <small> szt.</small>
          </th>
         </tr>
         <tr>
          <th>Powierzchnia</th>
          {values.days.map((item, index) => (
           <td key={index} style={{ color: 'red' }}>
            {item !== null &&
            pos &&
            item[pos.toLowerCase()].correctionsData.surface
             ? item[pos.toLowerCase()].correctionsData.surface.toFixed(1)
             : ' '}
           </td>
          ))}
          <td colSpan={3} style={{ color: 'red', fontWeight: 'bold' }}>
           {valuesSum && valuesSum.correctionsSurface.toFixed(2)}
           <small>
            {' '}
            m<sup>2</sup>
           </small>
          </td>
         </tr>
        </>
       )}
      </tbody>
     </Table>
    </>
   )}
  </div>
 );
};

SummaryTable.propTypes = {
 values: PropTypes.instanceOf(Object),
 view: PropTypes.oneOf(['production', 'employee']),
};

export default SummaryTable;
