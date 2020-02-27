import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader, Table, Icon, Tag } from 'antd';
import FullWidthTemplate from 'components/templates/fullWidth';
import {
 getCustomers,
 setSortCustomersList,
} from 'services/store/actions/customer';
import sortListBy from 'services/utils/sort/sortMethods';
import { useHistory } from 'react-router';
import Header from 'components/header';
import { AppState } from 'services/store';
import { Customer } from 'services/store/types/customers/Customers';

const columns = [
 {
  title: 'Nazwa firmy',
  dataIndex: 'company',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Imię',
  dataIndex: 'firstname',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Nazwisko',
  dataIndex: 'surname',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Liczba zamówień',
  dataIndex: 'ordersNumber',
  sorter: true,
  align: 'center',
 },
 {
  title: 'Status',
  dataIndex: 'status',
  sorter: false,
  align: 'center',
 },
];

interface CustomerItem {
 key: number;
 company: string;
 firstname: string;
 surname: string;
 ordersNumber: number;
 _id: string;
 status: JSX.Element;
}

const Customers = () => {
 const history = useHistory();
 const dispatch = useDispatch();
 const customers = useSelector((state: AppState) => state.customers);
 const { list, sortBy, sortDirection } = customers;

 const [customersList, setCustomersList] = useState<CustomerItem[]>([]);
 const [isLoading, setIsLoading] = useState<boolean>(true);

 useEffect(() => {
  setIsLoading(true);
  dispatch(getCustomers(() => setIsLoading(false)));
 }, []);

 useEffect(() => {
  if (list && sortBy) {
   const newList = list
    .sort((a: Customer, b: Customer) =>
     sortListBy[sortBy === 'ordersNumber' ? 'number' : 'string'](
      a,
      b,
      sortDirection,
      sortBy,
     ),
    )
    .map((customer: Customer, index: number) => {
     const { user, ordersNumber } = customer;
     return {
      key: index,
      company: user.company,
      firstname: user.firstname,
      surname: user.surname,
      ordersNumber,
      _id: customer._id,
      status: (
       <div>
        {
         <Tag color={user.isAccepted ? 'green' : 'red'}>
          {user.isAccepted
           ? 'Zaakceptowany'
           : user.company === 'USUNIĘTO'
           ? 'Usunięto'
           : 'Niezaakceptowany'}
         </Tag>
        }
       </div>
      ),
     };
    });
   setCustomersList(newList);
  }
 }, [list, sortBy, sortDirection]);

 const onChange = (pagination: any, filters: any, sorter: any) => {
  dispatch(
   setSortCustomersList(
    sorter.field,
    sortDirection === 'ascend' ? 'descend' : 'ascend',
   ),
  );
 };

 return (
  <FullWidthTemplate>
   <>
    <PageHeader ghost={false} title={<Header title="Klienci" />} />
    <>
     {
      <Table
       loading={isLoading}
       size="middle"
       pagination={false}
       columns={columns}
       dataSource={customersList}
       onChange={onChange}
       onRow={record => {
        return {
         onClick: () => {
          history.push(`/customers/${record._id}`);
         },
        };
       }}
       rowClassName={() => 'tableRow__clicable'}
       scroll={{ x: 600 }}
      />
     }
    </>
   </>
  </FullWidthTemplate>
 );
};

export default Customers;
