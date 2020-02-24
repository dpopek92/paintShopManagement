import React, { useEffect, useState } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Table, Icon } from 'antd';
import PageTemplate from 'components/templates/authTemplate';
import FullWidthTemplate from 'components/templates/fullWidth';
// import { setSpinner } from 'actions/view';
import {
 getCustomers,
 setSortCustomersList,
} from 'services/store/actions/customer';
import sortListBy from 'services/utils/sort/sortMethods';
import { signal } from 'services/const';
import { useHistory } from 'react-router';

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
 const customers = useSelector(state => state.customers);
 const { list, sortBy, sortDirection } = customers;

 const [customersList, setCustomersList] = useState([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  setIsLoading(true);
  dispatch(getCustomers(() => setIsLoading(false), signal.token));
 }, []);

 useEffect(() => {
  if (list && sortBy) {
   const newList = list
    .sort((a, b) =>
     sortListBy[sortBy === 'ordersNumber' ? 'number' : 'string'](
      a,
      b,
      sortDirection,
      sortBy,
     ),
    )
    .map((customer, index) => {
     const { company, firstname, surname, ordersNumber } = customer;
     return {
      key: index,
      company,
      firstname,
      surname,
      ordersNumber,
     };
    });
   setCustomersList(newList);
  }
 }, [list, sortBy, sortDirection]);

 const onChange = (pagination, filters, sorter) => {
  dispatch(setSortCustomersList(sorter.field, sorter.order || 'ascend'));
 };

 // przemyśleć jak w prosty sposób ogarnąć sortowanie

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
      {
       <Table
        loading={isLoading}
        size="middle"
        pagination={false}
        columns={columns}
        dataSource={customersList}
        onChange={onChange}
       />
      }
     </>
    </>
   </FullWidthTemplate>
  </PageTemplate>
 );
};

// Customers.propTypes = {};

export default Customers;
