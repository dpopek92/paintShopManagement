import React, { useState, useEffect } from 'react';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import { Customer } from 'services/store/types/customers/Customers';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'services/store';
import { useParams } from 'react-router';
import { getCustomers } from 'services/store/actions/customer';
import { setSpinner } from 'services/store/actions/view';
import Header from 'components/header';
import { Descriptions, Tag, PageHeader, Button, Icon } from 'antd';

const CustomerProfile = () => {
 const dispatch = useDispatch();
 const [customer, setCustomer] = useState<Customer | null>(null);
 const customers = useSelector((state: AppState) => state.customers.list);
 const { id } = useParams();

 useEffect(() => {
  if (customers.length) {
   const profile = customers.find((customer: Customer) => customer._id === id);
   if (profile) setCustomer(profile);
  } else {
   dispatch(setSpinner(true));
   dispatch(getCustomers(() => dispatch(setSpinner(false))));
  }
 }, [customers]);
 console.log(customer);
 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader
     ghost={false}
     title={<Header title="Dane klienta" />}
     extra={[
      <Button key="1" onClick={() => {}}>
       <Icon type="pie-chart" />
       Wyświetl statystyki
      </Button>,
      <Button key="2" onClick={() => {}}>
       <Icon type="team" />
       Wybierz podwładnych
      </Button>,
      <Button key="3" onClick={() => {}} type="danger">
       <Icon type="delete" />
       Usuń
      </Button>,
     ]}
    />
    {customer && (
     <Descriptions
      title={
       <>
        {customer.user.company}{' '}
        <Tag color={customer.user.isAccepted ? 'green' : 'red'}>
         {customer.user.isAccepted ? 'Zaakceptowany' : 'Niezaakceptowany'}
        </Tag>
       </>
      }
      layout="horizontal"
     >
      <Descriptions.Item label="Imię i nazwisko">{`${customer.user.firstname} ${customer.user.surname}`}</Descriptions.Item>
      <Descriptions.Item label="E-mail">
       {customer.user.email}
      </Descriptions.Item>
      <Descriptions.Item label="Nr telefonu">
       {customer.phone}
      </Descriptions.Item>
      <Descriptions.Item label="NIP">{customer.NIP}</Descriptions.Item>
      <Descriptions.Item label="Kod pocztowy">
       {customer.postcode}
      </Descriptions.Item>
      <Descriptions.Item label="Miejscowość">{customer.city}</Descriptions.Item>
      <Descriptions.Item label="Ulica">{customer.street}</Descriptions.Item>
     </Descriptions>
    )}
    <hr />
    <Header title="Cennik indywidualny" />
    <hr />
    <Header title="Zamówienia" />
   </>
  </FullWidthPageTemplate>
 );
};

export default CustomerProfile;
