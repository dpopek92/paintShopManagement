import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDate = styled.input`
 border-radius: 5px;
 border: 1px solid ${({ theme }) => theme.blowGreen};
 height: 36px;
 margin: 0 5px;
`;

const DateComponent = ({ value, onchange, title = '', id = '' }) => {
 return (
  <StyledDate
   type="date"
   id={id}
   title={title}
   value={value}
   onChange={onchange}
  />
 );
};

DateComponent.propTypes = {};

export default DateComponent;
