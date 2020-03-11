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
 webPage: '',
};

interface PropsT {
 setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
 values: ContactT;
 onclose: () => void;
 setChanges: () => void;
}

const AddWebPage: React.FC<PropsT> = ({
 values: { webPages },
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
     webPage: values.webPage,
    };
    const newWebPages = webPages.concat(item);
    setFieldValue('webPages', newWebPages);
    dispatch(globalSettingsAddItem('webPages', item));
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
      placeholder="Adres strony www"
      name="webPage"
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

export default withDrawer(AddWebPage);
