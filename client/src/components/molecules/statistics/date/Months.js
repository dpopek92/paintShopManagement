import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { months } from "const";
import { setActiveMonth, setActiveDay } from "actions/stats";

const StyledWrapper = styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
 @media (max-width: 600px) {
  flex-direction: column;
 }
`;

const StyledButton = styled.button`
 border: none;
 background: none;
 font-weight: bold;
 outline: none;
 text-shadow: 1px 1px 2px rgb(112, 112, 112);
 color: ${({ theme, active }) => (active ? `${theme.blowWarning}` : "#8dc63f")};
 font-size: 28px;
 transition: transform 100ms ease;
 &:hover {
  transform: translateY(-5px);
 }
 &:focus {
  outline: none;
 }
`;

const Months = () => {
 const dispatch = useDispatch();
 const activeMonth = useSelector(state => state.stats.activeMonth);

 // HANDLERS
 const handleMonth = month => {
  dispatch(setActiveMonth(month));
  dispatch(setActiveDay(null));
 };
 return (
  <StyledWrapper>
   {months.map((item, index) => (
    <StyledButton
     active={activeMonth === index + 1}
     key={item}
     onClick={() => handleMonth(index + 1)}
    >
     {item}
    </StyledButton>
   ))}
  </StyledWrapper>
 );
};

// Months.propTypes = {};

export default Months;
