import React, { useEffect, useState } from 'react';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import Header from 'components/header';
import { PageHeader, Button, Icon, Descriptions, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'services/store';
import {
 loadUserProfile,
 userProfileLoadSuccess,
 userLoadSuccess,
 logOutUser,
} from 'services/store/actions/auth';
import PasswordChange from './components/Modals/passwordChange';
import DataChange from './components/Modals/dataChange';
import AccountRemove from './components/Modals/accountRemove';
import { passwordChangeValues, userDataChangeValues } from './utils/types';
import {
 passwordChange,
 userDataChange,
} from 'services/apiRequests/user/update';
import withContext from 'hoc/withContext';
import { accountRemove } from 'services/apiRequests/user/remove';

const initModals = {
 passwordChange: false,
 dataChange: false,
 accountRemove: false,
};

const AccountSettings = ({
 permissionContext,
}: {
 permissionContext: string;
}) => {
 const dispatch = useDispatch();
 const auth = useSelector((state: AppState) => state.auth);
 const { user, profile } = auth;
 const [modal, setModal] = useState(initModals);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  dispatch(loadUserProfile());
 }, []);

 const handlePasswordChange = async (
  values: passwordChangeValues,
  actions: any,
 ) => {
  setLoading(true);
  await passwordChange(
   values,
   () => {
    setLoading(false);
    closeModals();
    message.success('Hasło zmienione');
   },
   err => {
    setLoading(false);
    actions.setErrors(err);
   },
  );
 };

 const handleUserDataChange = async (
  values: userDataChangeValues,
  actions: any,
 ) => {
  setLoading(true);
  await userDataChange(
   values,
   data => {
    setLoading(false);
    dispatch(userProfileLoadSuccess(data.profile));
    dispatch(userLoadSuccess(data.user, data.user.permission));
    closeModals();
    message.success('Dane zmienione');
   },
   err => {
    setLoading(false);
    actions.setErrors(err);
   },
  );
 };

 const handleAccountRemove = async (
  values: { password: string },
  actions: any,
 ) => {
  setLoading(true);
  await accountRemove(
   values.password,
   () => {
    setLoading(false);
    closeModals();
    dispatch(logOutUser());
   },
   err => {
    setLoading(false);
    actions.setErrors(err);
   },
  );
 };

 const closeModals = () => setModal(initModals);
 return (
  <FullWidthPageTemplate>
   <>
    <PageHeader
     ghost={false}
     title={<Header title="Twoje dane" />}
     extra={[
      <Button key="1" onClick={() => setModal({ ...modal, dataChange: true })}>
       <Icon type="edit" />
       Edytuj dane
      </Button>,
      <Button
       key="2"
       onClick={() => setModal({ ...modal, passwordChange: true })}
      >
       <Icon type="lock" />
       Zmień hasło
      </Button>,
      <Button
       key="3"
       onClick={() => setModal({ ...modal, accountRemove: true })}
       type="danger"
       disabled={permissionContext === 'admin'}
      >
       <Icon type="delete" />
       Usuń konto
      </Button>,
     ]}
    />

    <Descriptions title="Dane osobowe" layout="horizontal">
     <Descriptions.Item label="Imię">{user.firstname}</Descriptions.Item>
     <Descriptions.Item label="Nazwisko">{user.surname}</Descriptions.Item>
     <Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
    </Descriptions>

    {profile && (
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

    {/* MODALS */}
    <DataChange
     visible={modal.dataChange}
     loading={loading}
     handleOk={handleUserDataChange}
     handleCancel={closeModals}
     user={user}
     profile={profile}
    />
    <PasswordChange
     visible={modal.passwordChange}
     loading={loading}
     handleOk={handlePasswordChange}
     handleCancel={closeModals}
    />
    <AccountRemove
     visible={modal.accountRemove}
     loading={loading}
     handleOk={handleAccountRemove}
     handleCancel={closeModals}
    />
   </>
  </FullWidthPageTemplate>
 );
};

export default withContext(AccountSettings);
