import React from 'react';
import { Modal, Button, Form, Icon } from 'antd';
import { Formik } from 'formik';
import { schema } from './utils/validate';
import FieldPassword from 'components/FormFields/FieldPassword';

interface Props {
 visible: boolean;
 loading: boolean;
 handleOk: (values: { password: string }, actions: any) => void;
 handleCancel: () => void;
}

const AccountRemove: React.FC<Props> = ({
 visible,
 loading,
 handleOk,
 handleCancel,
}) => {
 return (
  <Modal
   destroyOnClose={true}
   visible={visible}
   title={
    <span style={{ color: 'red', margin: 0 }}>
     Usunięcie konta jest nieodwracalne
    </span>
   }
   onCancel={handleCancel}
   footer={[
    <Button key="back" onClick={handleCancel}>
     Anuluj
    </Button>,
    <Button
     key="submit"
     type="danger"
     loading={loading}
     htmlType="submit"
     form="accountRemoveForm"
    >
     Usuń
    </Button>,
   ]}
  >
   <Formik
    validationSchema={schema}
    onSubmit={handleOk}
    initialValues={{ password: '' }}
    render={props => (
     <Form
      noValidate
      className="form-container"
      onSubmit={props.handleSubmit}
      id="accountRemoveForm"
     >
      <FieldPassword
       {...props}
       placeholder="Hasło"
       name="password"
       required
       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
     </Form>
    )}
   />
  </Modal>
 );
};

export default AccountRemove;
