import React from 'react';
import { Formik } from 'formik';
import { ContactT } from 'services/store/types/settings/Settings';
import { Form, Button } from 'antd';
import FieldInput from 'components/FormFields/FieldInput';
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
 bankName: '',
 accountNumber: '',
};

interface PropsT {
 setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
 values: ContactT;
 onclose: () => void;
 setChanges: () => void;
}

const AddBankAccount: React.FC<PropsT> = ({
 values: { bankAccounts },
 onclose: closeDrawer,
 setChanges,
 setFieldValue,
}) => {
 const dispatch = useDispatch();

 return (
  <Formik
   validationSchema={schema}
   onSubmit={(values, actions) => {
    const item = {
     name: values.name,
     bankName: values.bankName,
     accountNumber: values.accountNumber,
    };
    const newBankAccounts = bankAccounts.concat(item);
    setFieldValue('bankAccounts', newBankAccounts);
    dispatch(globalSettingsAddItem('bankAccounts', item));
    setChanges();
    actions.setValues(initValues);
    actions.setErrors({});
    actions.setTouched({});
    closeDrawer();
   }}
   initialValues={initValues}
   render={props => (
    <Form noValidate onSubmit={props.handleSubmit}>
     <FieldInput
      {...props}
      placeholder="Nazwa"
      name="name"
      size="large"
      required
     />
     <FieldInput
      {...props}
      placeholder="Nazwa banku"
      name="bankName"
      size="large"
      required
     />
     <FieldInput
      {...props}
      placeholder="Numer konta"
      name="accountNumber"
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

export default withDrawer(AddBankAccount);
