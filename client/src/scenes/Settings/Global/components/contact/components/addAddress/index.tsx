import React from 'react';
import { Formik } from 'formik';
import { ContactT } from 'services/store/types/settings/Settings';
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
 postcode: '',
 city: '',
 street: '',
 description: '',
};

interface PropsT {
 setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
 values: ContactT;
 onclose: () => void;
 setChanges: () => void;
}

const AddAddress: React.FC<PropsT> = ({
 values: { addresses },
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
     postcode: values.postcode,
     city: values.city,
     street: values.street,
     description: values.description,
    };
    const newAddresses = addresses.concat(item);
    setFieldValue('addresses', newAddresses);
    dispatch(globalSettingsAddItem('addresses', item));
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
      placeholder="Ulica"
      name="street"
      size="large"
      required
     />
     <FormFieldInput
      {...props}
      placeholder="Kod pocztowy"
      name="postcode"
      size="large"
      required
     />
     <FormFieldInput
      {...props}
      placeholder="Miejscowość"
      name="city"
      size="large"
      required
     />
     <FormFieldInput
      {...props}
      placeholder="Opis"
      name="description"
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

export default withDrawer(AddAddress);
