import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
 isDayDisabledForProduction,
 isDayDisabledForEmployees,
} from 'utils/functions/statistics/';
import { setActiveDay } from 'actions/stats';

const StyledWrapper = styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
`;

const StyledButton = styled.button`
 border: none;
 background: none;
 font-weight: bold;
 outline: none;
 text-shadow: 1px 1px 2px rgb(112, 112, 112);
 color: ${({ theme, active }) => (active ? `${theme.blowWarning}` : '#bcf171')};
 font-size: 24px;
 transition: transform 100ms ease;
 &:hover {
  transform: translateY(-5px);
 }
 &:focus {
  outline: none;
 }
 &:disabled {
  color: rgb(206, 206, 206);
  &:hover {
   transform: none;
  }
 }
`;

const Days = ({ days, view }) => {
 const dispatch = useDispatch();
 const activeDay = useSelector(state => state.stats.activeDay);
 const activeMonth = useSelector(state => state.stats.activeMonth);

 // HANDLERS
 const handleDay = day => {
  dispatch(setActiveDay(day));
 };
 const isDayDisabled = item => {
  if (activeMonth === null) {
   return true;
  }
  if (view === 'production') {
   return isDayDisabledForProduction(item);
  }
  if (view === 'employee') {
   return isDayDisabledForEmployees(item);
  }
 };
 return (
  <StyledWrapper>
   {days.map((item, index) => {
    // console.log(item);
    return (
     <StyledButton
      active={activeDay === index}
      disabled={isDayDisabled(item)}
      key={index}
      onClick={() => handleDay(index)}
     >
      {index + 1}
     </StyledButton>
    );
   })}
  </StyledWrapper>
 );
};

Days.propTypes = {
 days: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
 view: PropTypes.oneOf(['production', 'employee']),
};

export default Days;
