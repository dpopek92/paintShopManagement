import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Table, Icon } from 'antd';
import PageTemplate from 'templates/AuthPageTemplate';
import FullWidthTemplate from 'templates/FullWidthPageTemplate';
import List from 'components/molecules/customersList/List';
import { setSpinner } from 'actions/view';
import { loadCustomers } from 'actions/customers';
import { signal } from 'const/';
import { useHistory } from 'react-router';
import sortBy from 'services/utils/sort/sortMethods';

const columns = [
 {
  title: 'Nazwa firmy',
  dataIndex: 'company',
  sorter: true,
 },
 {
  title: 'Imię',
  dataIndex: 'firstname',
  sorter: true,
 },
 {
  title: 'Nazwisko',
  dataIndex: 'surname',
  sorter: true,
 },
 {
  title: 'Liczba zamówień',
  dataIndex: 'ordersNumber',
  sorter: true,
 },
];

const Customers = () => {
 const history = useHistory();
 const dispatch = useDispatch();
 const customers = useSelector(state => state.customers.list);
 //  const sortBy = useSelector(state => state.view.sortList.customersList);
 const [list, setList] = useState(null);

 useEffect(() => {
  dispatch(setSpinner(true));
  dispatch(loadCustomers(() => dispatch(setSpinner(false)), signal.token));
 }, []);

 useEffect(() => {
  if (customers) {
   const customersList = customers.map((customer, index) => {
    const { company, firstname, surname, ordersNumber } = customer;
    return {
     key: index,
     company,
     firstname,
     surname,
     ordersNumber,
    };
   });
   setList(customersList);
  }
 }, [customers]);

 const onChange = (pagination, filters, sorter) => {
  const { field } = sorter;
  const newList = list.sort((a, b) =>
   sortBy[field === 'ordersNumber' ? 'number' : 'string'](
    a,
    b,
    sorter.order,
    sorter.field,
   ),
  );
  setList(newList);
 };

 return (
  <PageTemplate>
   <FullWidthTemplate>
    <>
     <PageHeader
      ghost={false}
      onBack={() => history.goBack()}
      title="Klienci"
     />
     <>
      {list && (
       <Table
        size="middle"
        pagination={false}
        columns={columns}
        dataSource={list}
        onChange={onChange}
       />
      )}
     </>
     {/* <>{customers && <List />}</> */}
    </>
   </FullWidthTemplate>
  </PageTemplate>
 );
};

// Customers.propTypes = {};

export default Customers;
