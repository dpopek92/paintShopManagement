import React, { useEffect } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import { setSpinner } from 'actions/view';
import {
 setActiveYear,
 setActiveCustomer,
 getYearCustomerSummary,
 getMonthCustomerSummary,
 setYearsCustomer,
} from 'actions/stats';
import { signal, currentDate } from 'const';
import { loadCustomers, loadCustomerData } from 'actions/customers';
import { getCustomerYears } from 'utils/functions/statistics';
import Years from 'components/molecules/statistics/date/Years';
import Months from 'components/molecules/statistics/date/Months';
import Summary from 'components/organisms/statistics/customer/Summary';
import { loadAdminOrders, loadUserEndedInMonthOrders } from 'actions/orders';

const StyledSelectWrapper = styled(Form.Group)`
 label {
  font-weight: bold;
 }
 select {
  width: 300px;
 }
 @media (max-width: 600px) {
  select {
   width: 100%;
  }
 }
`;

const Customers = () => {
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);
 const years = useSelector(state => state.stats.years);
 const activeYear = useSelector(state => state.stats.activeYear);
 const activeMonth = useSelector(state => state.stats.activeMonth);
 const activeCustomer = useSelector(state => state.stats.activeCustomer);

 // GET CUSTOMERS & GET YEARS
 useEffect(() => {
  if (!customers) {
   dispatch(setSpinner(true));
   dispatch(loadCustomers(() => dispatch(setSpinner(false)), signal.token));
  }
  const yearsArr = getCustomerYears();
  dispatch(setYearsCustomer(yearsArr));
 }, []);

 // SET DATE
 useEffect(() => {
  if (years) {
   dispatch(setActiveYear(currentDate.getFullYear()));
  }
 }, [years]);

 // GET STATS
 useEffect(() => {
  if (activeCustomer) {
   dispatch(setSpinner(true));
   dispatch(
    loadCustomerData(
     activeCustomer,
     () => {
      dispatch(setSpinner(false));
     },
     signal.token,
    ),
   );
   if (activeYear && !activeMonth) {
    // getYearStats
    dispatch(
     getYearCustomerSummary(activeCustomer, activeYear, signal.token, () => {
      dispatch(setSpinner(false));
     }),
    );
   } else if (activeYear && activeMonth) {
    const dateFrom = new Date(activeYear, activeMonth - 1, 1);
    const date = new Date(activeYear, activeMonth, 1);
    console.log(dateFrom, date);
    // getMonthStats
    dispatch(
     getMonthCustomerSummary(
      activeCustomer,
      activeYear,
      activeMonth,
      signal.token,
      () => {
       dispatch(setSpinner(false));
      },
     ),
    );
    dispatch(
     loadUserEndedInMonthOrders(
      activeCustomer,
      activeMonth,
      activeYear,
      signal.token,
      () => dispatch(setSpinner(false)),
     ),
    );
   }
  }
 }, [activeYear, activeMonth, activeCustomer]);

 // HANDLERS
 const handleSort = (a, b) => a.company.localeCompare(b.company);
 const handleSelect = e => dispatch(setActiveCustomer(e.target.value));

 return (
  <FullWidthTemplate title="Statystyki klientów">
   <>
    <StyledSelectWrapper controlId="employeesStatsSelect">
     <Form.Label>Klienci</Form.Label>
     <Form.Control as="select" onChange={handleSelect} value={activeCustomer}>
      <option value="" />
      {customers &&
       customers
        .sort(handleSort)
        .map(item => (
         <option
          key={item._id}
          value={item._id}
         >{`${item.company} - ${item.firstname[0]}`}</option>
        ))}
     </Form.Control>
    </StyledSelectWrapper>
    <hr />
    <Years />
    <Months />
    <hr />
    <Summary />
   </>
  </FullWidthTemplate>
 );
};

Customers.propTypes = {};

export default Customers;
