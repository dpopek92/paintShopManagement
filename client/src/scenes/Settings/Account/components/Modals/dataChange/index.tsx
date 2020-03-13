import React from 'react';
import { Modal, Button, Form, Icon } from 'antd';
import { Formik } from 'formik';
import { schema } from './utils/validate';
import { UserT } from 'services/store/types/auth/Auth';
import { CustomerT } from 'services/store/types/customers/Customers';
import { userDataChangeValuesT } from 'scenes/Settings/Account/utils/types';
import FieldInput from 'components/FormFields/FieldInput';

interface Props {
 visible: boolean;
 loading: boolean;
 handleOk: (values: userDataChangeValuesT, actions: any) => void;
 handleCancel: () => void;
 user: UserT;
 profile: CustomerT | null;
}

const UserDataChange: React.FC<Props> = ({
 visible,
 loading,
 handleOk,
 handleCancel,
 user,
 profile,
}) => {
 return (
  <Modal
   style={{ top: 20 }}
   destroyOnClose={true}
   visible={visible}
   title="Edycja danych"
   onCancel={handleCancel}
   footer={[
    <Button key="back" onClick={handleCancel}>
     Anuluj
    </Button>,
    <Button
     key="submit"
     type="primary"
     loading={loading}
     htmlType="submit"
     form="userDataChangeForm"
    >
     Zatwierdź
    </Button>,
   ]}
  >
   {profile && (
    <Formik
     validationSchema={schema}
     onSubmit={handleOk}
     initialValues={{
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      phone: profile.phone,
      company: user.company,
      NIP: profile.NIP,
      street: profile.street,
      postcode: profile.postcode,
      city: profile.city,
     }}
     render={props => (
      <Form
       noValidate
       layout="horizontal"
       className="form-container"
       onSubmit={props.handleSubmit}
       id="userDataChangeForm"
      >
       <FieldInput
        {...props}
        placeholder="Imię"
        name="firstname"
        required
        label="Imię"
       />
       <FieldInput
        {...props}
        placeholder="Nazwisko"
        name="surname"
        required
        label="Nazwisko"
       />
       <FieldInput
        {...props}
        placeholder="E-mail"
        name="email"
        required
        label="E-mail"
        type="email"
       />
       <FieldInput
        {...props}
        placeholder="Nr telefonu"
        name="phone"
        required
        label="Nr telefonu"
       />
       <FieldInput
        {...props}
        placeholder="Nazwa firmy"
        name="company"
        required
        label="Nazwa firmy"
       />
       <FieldInput
        {...props}
        placeholder="NIP"
        name="NIP"
        required
        label="NIP"
       />
       <FieldInput
        {...props}
        placeholder="Ulica"
        name="street"
        required
        label="Ulica"
       />
       <FieldInput
        {...props}
        placeholder="Kod pocztowy"
        name="postcode"
        required
        label="Kod pocztowy"
       />
       <FieldInput
        {...props}
        placeholder="Miasto"
        name="city"
        required
        label="Miasto"
       />
      </Form>
     )}
    />
   )}
  </Modal>
 );
};

export default UserDataChange;
