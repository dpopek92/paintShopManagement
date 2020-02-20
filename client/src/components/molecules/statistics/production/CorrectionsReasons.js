/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledH3 as Heading } from 'components/atoms/heading/Headings';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

const CorrectionsReasons = ({ values }) => {
 const [valuesSum, setValuesSum] = useState(null);
 const pos = useSelector(state => state.stats.activePosition);

 useEffect(() => {
  if (pos && values) {
   const data = {
    mechanicalDamage: {
     elements: 0,
     surface: 0,
     name: 'Uszkodzenie mechaniczne',
    },
    damagedLaminate: {
     elements: 0,
     surface: 0,
     name: 'Uszkodzony laminat',
    },
    particle: { elements: 0, surface: 0, name: 'Paproch' },
    bruise: { elements: 0, surface: 0, name: 'Zaciek' },
    badlyPainted: {
     elements: 0,
     surface: 0,
     name: 'Element źle polakierowany',
    },
    leftSide: {
     elements: 0,
     surface: 0,
     name: 'Niepolakierowana lewa strona',
    },
    polishingHole: { elements: 0, surface: 0, name: 'Przetarcie' },
    other: { elements: 0, surface: 0, name: 'Inny' },
   };
   values.days.forEach(day => {
    if (day && pos !== 'Nowe' && pos !== 'Odebrane') {
     const element = day[pos.toLowerCase()].correctionsData.reasons;
     Object.keys(element).forEach(key => {
      const item = element[key];
      data[key].elements += item.elements;
      data[key].surface += item.surface;
     });
    }
   });
   setValuesSum(data);
  }
 }, [values, pos]);

 //  console.log(values);
 return (
  valuesSum && (
   <>
    <Heading>Przyczyny poprawek</Heading>
    <div style={{ maxWidth: 500 }}>
     <Table striped bordered responsive hover>
      <tbody>
       {Object.keys(valuesSum).map((key, index) => (
        <React.Fragment key={index}>
         <tr>
          <th rowSpan={2} style={{ width: 150 }}>
           {valuesSum[key].name}
          </th>
          <td>Elementy</td>
          <td
           style={
            valuesSum[key].elements === 0
             ? { color: 'green', fontWeight: 'bold' }
             : {}
           }
          >
           {valuesSum[key].elements ? `${valuesSum[key].elements} szt.` : '0'}
          </td>
         </tr>
         <tr>
          <td>Powierzchnia</td>
          <td
           style={
            valuesSum[key].surface === 0
             ? { color: 'green', fontWeight: 'bold' }
             : {}
           }
          >
           {valuesSum[key].surface
            ? `${valuesSum[key].surface.toFixed(2)} m2`
            : '0'}
          </td>
         </tr>
        </React.Fragment>
       ))}
      </tbody>
     </Table>
    </div>
   </>
  )
 );
};

CorrectionsReasons.propTypes = {
 values: PropTypes.instanceOf(Object),
};

export default CorrectionsReasons;
