import React from 'react';
import { Modal, Button, Form, Icon } from 'antd';
import { Formik } from 'formik';
import { schema } from './utils/validate';
import FormField from 'components/FormField';
import { User } from 'services/store/types/auth/Auth';
import { Customer } from 'services/store/types/customers/Customers';
import { userDataChangeValues } from 'scenes/Settings/Account/utils/types';

interface Props {
 visible: boolean;
 loading: boolean;
 handleOk: (values: userDataChangeValues, actions: any) => void;
 handleCancel: () => void;
 user: User;
 profile: Customer | null;
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
       <FormField
        {...props}
        placeholder="Imię"
        name="firstname"
        type="firstname"
        required
        label="Imię"
       />
       <FormField
        {...props}
        placeholder="Nazwisko"
        name="surname"
        type="surname"
        required
        label="Nazwisko"
       />
       <FormField
        {...props}
        placeholder="E-mail"
        name="email"
        type="email"
        required
        label="E-mail"
       />
       <FormField
        {...props}
        placeholder="Nr telefonu"
        name="phone"
        type="phone"
        required
        label="Nr telefonu"
       />
       <FormField
        {...props}
        placeholder="Nazwa firmy"
        name="company"
        type="company"
        required
        label="Nazwa firmy"
       />
       <FormField
        {...props}
        placeholder="NIP"
        name="NIP"
        type="NIP"
        required
        label="NIP"
       />
       <FormField
        {...props}
        placeholder="Ulica"
        name="street"
        type="street"
        required
        label="Ulica"
       />
       <FormField
        {...props}
        placeholder="Kod pocztowy"
        name="postcode"
        type="postcode"
        required
        label="Kod pocztowy"
       />
       <FormField
        {...props}
        placeholder="Miasto"
        name="city"
        type="city"
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
