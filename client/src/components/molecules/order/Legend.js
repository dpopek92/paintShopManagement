import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';

const SmallDiv = styled.div`
  width: 40px;
  height: 20px;
  display: inline-block;
`;
const PrimaryColumn = styled.td`
  background-color: rgba(205, 231, 169, 0.5);
`;
const SecondaryColumn = styled.td`
  background-color: rgba(252, 215, 160, 0.5);
`;

const Legend = ({ permissionContext }) => {
  return (
    <>
      {permissionContext === 'admin' && (
        <div>
          <SmallDiv className="elementToLong" />
          <span>
            {' '}
            <small>- element dłuższy niż 2750 mm</small>
          </span>
        </div>
      )}
      {permissionContext !== 'user' && (
        <div>
          <SmallDiv className="elementLost" />
          <span>
            {' '}
            <small>- brakujący element</small>
          </span>
          <br />
          <SmallDiv className="elementToCorrect" />
          <span>
            {' '}
            <small>- element do poprawy</small>
          </span>
        </div>
      )}
      {permissionContext !== 'employee' && permissionContext !== 'display' && (
        <>
          <div>
            <SmallDiv className="elementNotIncludedToPrice" />
            <span>
              {' '}
              <small>- cena tego elementu zostanie ustalona indywidualnie</small>
            </span>
            <br />
          </div>
          <div>
            <span>*</span>{' '}
            <small>
              - przy zamówieniu mniejszym niż 1m<sup>2</sup> cena zamówienia odpowiada kwocie za 1m
              <sup>2</sup>
            </small>
          </div>
        </>
      )}
    </>
  );
};

Legend.propTypes = {};

export default withContext(Legend);
