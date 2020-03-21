import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getCustomers } from 'services/store/actions/customer';
import { setSpinner } from 'services/store/actions/view';
import { getGlobalSettings } from 'services/store/actions/settings';
import { calculateDiscounts } from './utils';
import { customerAccountRemove } from 'services/apiRequests/customer/remove';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import Prices from 'components/prices';
import CustomerData from '../components/customerData';
import AccountRemove from '../components/Modals/accountRemove';
import { Button, PageHeader, Icon, message } from 'antd';
import { CustomerT } from 'services/store/types/customers/Customers';
import { AppStateT } from 'services/store';
import Header from 'components/header';
import { PricesT } from 'services/store/types/settings/Settings';
import { customerDiscountsUpdate } from 'services/apiRequests/customer/update';

const initModal = {
 accountRemove: false,
 setSubordinates: false,
};

const CustomerProfile = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const history = useHistory();
 const customers = useSelector((state: AppStateT) => state.customers.list);
 const prices = useSelector((state: AppStateT) => state.settings.prices);

 const [customer, setCustomer] = useState<CustomerT | null>(null);
 const [customerPrices, setCustomerPrices] = useState<PricesT | null>(null);
 const [loading, setLoading] = useState(false);
 const [modal, setModal] = useState(initModal);

 // GET DATA
 useEffect(() => {
  if (customers.length) {
   const profile = customers.find((customer: CustomerT) => customer._id === id);
   if (profile) setCustomer(profile);
  } else {
   dispatch(setSpinner(true));
   dispatch(getCustomers(() => dispatch(setSpinner(false))));
  }
  if (!prices) {
   dispatch(getGlobalSettings(() => dispatch(setSpinner(false))));
  }
 }, [customers]);

 //  CALC DISCOUNTS
 useEffect(() => {
  if (prices && customer?.discounts) {
   const values = calculateDiscounts(prices, customer.discounts);
   setCustomerPrices(values);
  }
 }, [prices, customer?.discounts]);

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

 const handleDiscountsSubmit = async (
  values: PricesT,
  actions: any,
  setIsEdit: any,
 ) => {
  if (id) {
   dispatch(setSpinner(true));
   console.log(values);
   await customerDiscountsUpdate(
    id,
    values,
    () => {
     setIsEdit(false);
     dispatch(setSpinner(false));
     message.success('Dane zostały zaktualizowane');
    },
    () => {
     dispatch(setSpinner(false));
     message.error('Błąd serwera');
    },
   );
  }
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
    {customer && <CustomerData data={customer} />}
    <hr />
    <Header title="Cennik indywidualny" type="h1" />
    {customerPrices && (
     <Prices data={customerPrices} handleSubmit={handleDiscountsSubmit} />
    )}
    <hr />
    <Header title="Zamówienia" type="h1" />
    orders
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
