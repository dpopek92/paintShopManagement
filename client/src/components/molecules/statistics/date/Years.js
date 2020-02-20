import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { setActiveMonth, setActiveDay, setActiveYear } from "actions/stats";

const StyledWrapper = styled.div`
 display: flex;
 flex-wrap: nowrap;
 justify-content: center;
`;

const StyledButton = styled.button`
 margin-right: 20px;
 margin-left: 20px;
 border: none;
 background: none;
 font-weight: bold;
 outline: none;
 text-shadow: 1px 1px 2px rgb(112, 112, 112);
 color: ${({ theme, active }) => (active ? `${theme.blowWarning}` : "#5f8a24")};
 font-size: 40px;
 transition: transform 100ms ease;
 &:hover {
  transform: translateY(-5px);
 }
 &:focus {
  outline: none;
 }
`;

const Years = () => {
 const dispatch = useDispatch();
 const years = useSelector(state => state.stats.years);
 const activeYear = useSelector(state => state.stats.activeYear);

 // HANDLERS
 const handleYear = year => {
  dispatch(setActiveYear(year));
  dispatch(setActiveMonth(null));
  dispatch(setActiveDay(null));
 };
 return (
  <StyledWrapper>
   {years &&
    years.map(item => (
     <StyledButton
      active={activeYear === item}
      key={item}
      onClick={() => handleYear(item)}
     >
      {item}
     </StyledButton>
    ))}
  </StyledWrapper>
 );
};

// Years.propTypes = {};

export default Years;
