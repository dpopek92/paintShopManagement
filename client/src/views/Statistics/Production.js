import React, { useEffect } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import Buttons from 'components/molecules/statistics/Buttons';
import Date from 'components/molecules/statistics/date/Container';
import { setSpinner } from 'actions/view';
import {
 getProductionStatsYears,
 setActiveYear,
 setActiveMonth,
 getProductionStats,
 setActivePosition,
} from 'actions/stats';
import { signal, currentDate } from 'const';
import MonthSummary from 'components/organisms/statistics/production/MonthSummary';
import PositionSummary from 'components/organisms/statistics/PositionSummary';
import PositionDailyStats from 'components/organisms/statistics/production/PositionDailyStats';

const positions = ['Blow', 'Nowe', 'Odebrane'];
const StyledHeader = styled.h1`
 font-weight: bold;
 letter-spacing: 3px;
 text-shadow: ${({ position }) =>
  position === 'Podkład' ? '2px 2px 5px rgb(48, 48, 48)' : 'none'};
`;
const StyledSpan = styled.span`
 color: ${({ theme, position }) =>
  !positions.includes(position) ? theme.positions[position] : 'black'};
`;

const Production = () => {
 const dispatch = useDispatch();
 const stats = useSelector(state => state.stats);
 const {
  years,
  activeYear,
  activeMonth,
  activeDay,
  activePosition,
  productionStats,
 } = stats;

 // GET YEARS && SET CURRENT DATE
 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(
   getProductionStatsYears(() => {
    dispatch(setSpinner(false));
    if (!activeYear) dispatch(setActiveYear(currentDate.getFullYear()));
    if (!activeMonth) dispatch(setActiveMonth(currentDate.getMonth() + 1));
    if (!activePosition) dispatch(setActivePosition('Blow'));
   }, signal.token),
  );
 }, []);

 // GET STATS
 useEffect(() => {
  if (activeYear && activeMonth) {
   dispatch(setSpinner(true));
   dispatch(
    getProductionStats(
     activeYear,
     activeMonth,
     () => dispatch(setSpinner(false)),
     signal.token,
    ),
   );
  }
 }, [activeMonth, activeYear]);

 return (
  <>
   <FullWidthTemplate title="Statystyki produkcyjne">
    <>
     <Buttons view="production" />
     <hr />
     {years && (
      <>
       <Date stats={productionStats} view="production" />
       <hr />
      </>
     )}
     {activePosition && activePosition !== 'Blow' && (
      <StyledHeader position={activePosition}>
       <StyledSpan position={activePosition}>{activePosition}</StyledSpan>
      </StyledHeader>
     )}
     {activePosition === 'Blow' && activeMonth && <MonthSummary />}
     {productionStats &&
      activePosition &&
      activePosition !== 'Blow' &&
      activeMonth &&
      activeDay === null && (
       <PositionSummary values={productionStats} view="production" />
      )}
     {activePosition !== 'Blow' && activeMonth && activeDay !== null && (
      <PositionDailyStats />
     )}
    </>
   </FullWidthTemplate>
  </>
 );
};

// Production.propTypes = {};

export default Production;
