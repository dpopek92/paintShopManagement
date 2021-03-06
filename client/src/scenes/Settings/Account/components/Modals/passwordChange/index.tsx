import React from 'react';
import { Modal, Button, Form, Icon } from 'antd';
import { Formik } from 'formik';
import { schema } from './utils/validate';
import { passwordChangeValuesT } from 'scenes/Settings/Account/utils/types';
import FieldPassword from 'components/FormFields/FieldPassword';

const initValues = {
 password: '',
 newPassword: '',
 newPassword2: '',
};

interface Props {
 visible: boolean;
 loading: boolean;
 handleOk: (values: passwordChangeValuesT, actions: any) => void;
 handleCancel: () => void;
}

const PasswordChange: React.FC<Props> = ({
 visible,
 loading,
 handleOk,
 handleCancel,
}) => {
 return (
  <Modal
   destroyOnClose={true}
   visible={visible}
   title="Zmiana hasła"
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
     form="passwordChangeForm"
    >
     Zatwierdź
    </Button>,
   ]}
  >
   <Formik
    validationSchema={schema}
    onSubmit={handleOk}
    validate={values => {
     const errors: any = {};
     if (values.newPassword2 !== values.newPassword) {
      errors.newPassword2 = 'Hasła muszą być identyczne';
     }
     return errors;
    }}
    initialValues={initValues}
    render={props => (
     <Form
      noValidate
      className="form-container"
      onSubmit={props.handleSubmit}
      id="passwordChangeForm"
     >
      <FieldPassword
       {...props}
       placeholder="Hasło"
       name="password"
       required
       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
      <FieldPassword
       {...props}
       placeholder="Nowe hasło"
       name="newPassword"
       required
       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
      <FieldPassword
       {...props}
       placeholder="Powtórz nowe hasło"
       name="newPassword2"
       required
       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
     </Form>
    )}
   />
  </Modal>
 );
};

export default PasswordChange;
