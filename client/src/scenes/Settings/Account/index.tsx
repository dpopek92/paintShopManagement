import React, { useEffect } from 'react';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import Header from 'components/header';
import { PageHeader, Button, Icon, Descriptions } from 'antd';
import { useSelector } from 'react-redux';
import { AppState } from 'services/store';

const AccountSettings = () => {
 const auth = useSelector((state: AppState) => state.auth);
 const { user, profile } = auth;

 //  useEffect(() => {
 //   effect;
 //   return () => {
 //    cleanup;
 //   };
 //  }, [input]);
 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader
     ghost={false}
     title={<Header title="Twoje dane" />}
     extra={[
      <Button key="1" onClick={() => {}}>
       <Icon type="edit" />
       Edytuj dane
      </Button>,
      <Button key="2" onClick={() => {}}>
       <Icon type="lock" />
       Zmień hasło
      </Button>,
      <Button key="3" onClick={() => {}} type="danger">
       <Icon type="delete" />
       Usuń
      </Button>,
     ]}
    />
    <Descriptions title="Dane osobowe" layout="horizontal">
     <Descriptions.Item label="Imię">{user.firstname}</Descriptions.Item>
     <Descriptions.Item label="Nazwisko">{user.surname}</Descriptions.Item>
     <Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
    </Descriptions>
    {profile.phone && (
     <Descriptions title="Dane do faktury" layout="horizontal">
      <Descriptions.Item label="Nazwa firmy">{user.company}</Descriptions.Item>
      <Descriptions.Item label="NIP">{profile.NIP}</Descriptions.Item>
      <Descriptions.Item label="Kod pocztowy">
       {profile.postcode}
      </Descriptions.Item>
      <Descriptions.Item label="Miejscowość">{profile.city}</Descriptions.Item>
      <Descriptions.Item label="Ulica">{profile.street}</Descriptions.Item>
      <Descriptions.Item label="Nr telefonu">{profile.phone}</Descriptions.Item>
     </Descriptions>
    )}
   </>
  </FullWidthPageTemplate>
 );
};

export default AccountSettings;
