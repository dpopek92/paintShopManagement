import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';

const Column = styled.th`
  width: 25%;
  background-color: ${({ side, theme }) => {
    if (side === 'left') return theme.blowWarning;
    else if (side === 'right') return theme.blowGreen;
  }};
`;
const PrimaryColumn = styled.td`
  background-color: rgba(205, 231, 169, 0.5);
`;
const SecondaryColumn = styled.td`
  background-color: rgba(252, 215, 160, 0.5);
`;

const Summary = ({ order, permissionContext }) => {
  const [values, setValues] = useState(null);

  useEffect(() => {
    let flatPL = 0,
      flatPP = 0,
      cncPL = 0,
      cncPP = 0;
    if (order) {
      order.items.forEach(item => {
        if (item.type === 'Gładki') {
          if (item.surfaceRight) {
            flatPL += item.surfaceRight;
          }
          if (item.surfaceLeft) {
            flatPP += item.surfaceLeft;
          }
        } else {
          if (item.surfaceRight) {
            cncPL += item.surfaceRight;
          }
          if (item.surfaceLeft) {
            cncPP += item.surfaceLeft;
          }
        }
      });
      setValues({ flatPL, flatPP, cncPL, cncPP });
    }
  }, [order]);
  return (
    <>
      {permissionContext === 'admin' && values && (
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th colSpan={2}>
                Elementy gładkie:
                <br />
                <small>
                  (m<sup>2</sup>)
                </small>
              </th>

              <th colSpan={2}>
                Elementy frezowane:
                <br />
                <small>
                  (m<sup>2</sup>)
                </small>
              </th>
            </tr>
            <tr>
              <Column side="right">PL</Column>
              <Column side="left">PP</Column>
              <Column side="right">PL</Column>
              <Column side="left">PP</Column>
            </tr>
          </thead>
          <tbody>
            <tr>
              <PrimaryColumn>{values.flatPL && values.flatPL.toFixed(3)}</PrimaryColumn>
              <SecondaryColumn>{values.flatPP && values.flatPP.toFixed(3)}</SecondaryColumn>
              <PrimaryColumn>{values.cncPL && values.cncPL.toFixed(3)}</PrimaryColumn>
              <SecondaryColumn>{values.cncPP && values.cncPP.toFixed(3)}</SecondaryColumn>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
};

Summary.propTypes = {};

export default withContext(Summary);
