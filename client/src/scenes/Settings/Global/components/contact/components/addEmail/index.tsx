import React from 'react';
import { Formik } from 'formik';
import { PhoneT, ContactT } from 'services/store/types/settings/Settings';
import { Form, Button } from 'antd';
import FormFieldInput from 'components/FormFields/FormFieldInput';
import { schema } from './utils/validate';
import styled from 'styled-components';
import withDrawer from '../withDrawer';
import { useDispatch } from 'react-redux';
import { globalSettingsAddItem } from 'services/store/actions/settings';

const StyledButtons = styled.div`
 margin-top: 10px;
 text-align: right;
 button {
  margin-right: 10px;
 }
`;

const initValues = {
 name: '',
 email: '',
};

interface PropsT {
 setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
 values: ContactT;
 onclose: () => void;
 setChanges: () => void;
}
const AddEmail: React.FC<PropsT> = ({
 values: { emails },
 onclose: closeDrawer,
 setChanges,
 setFieldValue,
}) => {
 const dispatch = useDispatch();

 return (
  <Formik
   validationSchema={schema}
   onSubmit={(values, actions) => {
    const item = { name: values.name, email: values.email };
    const newEmails = emails.concat(item);
    setFieldValue(`emails`, newEmails);
    dispatch(globalSettingsAddItem('emails', item));
    setChanges();
    actions.setValues(initValues);
    actions.setErrors({});
    actions.setTouched({});
    closeDrawer();
   }}
   initialValues={initValues}
   render={props => (
    <Form noValidate onSubmit={props.handleSubmit}>
     <FormFieldInput
      {...props}
      placeholder="Nazwa"
      name="name"
      size="large"
      required
     />
     <FormFieldInput
      {...props}
      placeholder="Adres e-mail"
      name="email"
      size="large"
      required
     />
     <StyledButtons>
      <Button type="primary" htmlType="submit">
       Dodaj
      </Button>
     </StyledButtons>
    </Form>
   )}
  />
 );
};

export default withDrawer(AddEmail);
