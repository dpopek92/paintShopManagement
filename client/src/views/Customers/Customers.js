import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PageTemplate from "templates/PageTemplate";
import FullWidthTemplate from "templates/FullWidthPageTemplate";
import List from "components/molecules/customersList/List";
import { setSpinner } from "actions/view";
import { loadCustomers } from "actions/customers";
import { signal } from "const/";

const Customers = () => {
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(loadCustomers(() => dispatch(setSpinner(false)), signal.token));
 }, []);
 return (
  <PageTemplate>
   <FullWidthTemplate title="Klienci">
    <>{customers && <List />}</>
   </FullWidthTemplate>
  </PageTemplate>
 );
};

// Customers.propTypes = {};

export default Customers;
