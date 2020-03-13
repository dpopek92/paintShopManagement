import React, { useState, useEffect } from 'react';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import { CustomerT } from 'services/store/types/customers/Customers';
import { useSelector, useDispatch } from 'react-redux';
import { AppStateT } from 'services/store';
import { useParams, useHistory } from 'react-router';
import { getCustomers } from 'services/store/actions/customer';
import { setSpinner } from 'services/store/actions/view';
import Header from 'components/header';
import { Descriptions, Tag, PageHeader, Button, Icon, message } from 'antd';
import AccountRemove from '../components/Modals/accountRemove';
import { customerAccountRemove } from 'services/apiRequests/customer/remove';

const initModal = {
 accountRemove: false,
 setSubordinates: false,
};

const CustomerProfile = () => {
 const dispatch = useDispatch();
 const history = useHistory();
 const [customer, setCustomer] = useState<CustomerT | null>(null);
 const customers = useSelector((state: AppStateT) => state.customers.list);
 const { id } = useParams();

 const [loading, setLoading] = useState(false);
 const [modal, setModal] = useState(initModal);

 useEffect(() => {
  if (customers.length) {
   const profile = customers.find((customer: CustomerT) => customer._id === id);
   if (profile) setCustomer(profile);
  } else {
   dispatch(setSpinner(true));
   dispatch(getCustomers(() => dispatch(setSpinner(false))));
  }
 }, [customers]);

 const handleUserRemove = async () => {
  setLoading(true);
  if (customer)
   await customerAccountRemove(
    customer.user._id,
    () => {
     setLoading(false);
     history.push('/customers');
    },
    err => {
     setLoading(false);
     message.error(err.msg);
     closeModals();
    },
   );
 };

 const closeModals = () => setModal(initModal);

 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader
     ghost={false}
     title={<Header title="Dane klienta" type="h1" />}
     extra={[
      <Button key="1" onClick={() => {}} disabled>
       <Icon type="pie-chart" />
       Wyświetl statystyki
      </Button>,
      <Button key="2" onClick={() => {}} disabled>
       <Icon type="team" />
       Wybierz podwładnych
      </Button>,
      <Button
       key="3"
       onClick={() => setModal({ ...modal, accountRemove: true })}
       type="danger"
       disabled={customer ? customer.user.permission === 'admin' : false}
      >
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
    <Header title="Cennik indywidualny" type="h2" />
    <hr />
    <Header title="Zamówienia" type="h2" />

    {/* MODALS */}
    <AccountRemove
     loading={loading}
     visible={modal.accountRemove}
     handleOk={handleUserRemove}
     handleCancel={closeModals}
    />
   </>
  </FullWidthPageTemplate>
 );
};

export default CustomerProfile;
