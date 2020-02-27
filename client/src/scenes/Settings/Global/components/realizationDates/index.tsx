import React, { useState } from 'react';
import styled from 'styled-components';
import { RealizationDatesT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button } from 'antd';
import FormField from 'components/FormField';

const StyledWrapper = styled.div`
 width: 300px;
 button {
  margin-right: 10px;
 }
`;

interface PropsT {
 values: RealizationDatesT | null;
}

const RealizationDates: React.FC<PropsT> = ({ values }) => {
 const [isEdit, setIsEdit] = useState(true);

 const handleEdit = () => setIsEdit(!isEdit);
 return (
  <StyledWrapper>
   {values && (
    <Formik
     //  validationSchema={schema}
     onSubmit={values => {
      console.log(values);
     }}
     initialValues={values}
     render={props => (
      <Form noValidate className="form-container" onSubmit={props.handleSubmit}>
       <FormField
        {...props}
        label="Połysk"
        name="gloss"
        type="number"
        size="large"
        disabled={isEdit}
        required
       />
       <FormField
        {...props}
        label="Półmat"
        name="semiGloss"
        type="number"
        size="large"
        disabled={isEdit}
        required
       />
       <FormField
        {...props}
        label="CNC"
        name="milling"
        type="number"
        size="large"
        disabled={isEdit}
        required
       />
       <FormField
        {...props}
        label="Fornir"
        name="veneer"
        type="number"
        size="large"
        disabled={isEdit}
        required
       />
       <Button onClick={handleEdit}>Edytuj</Button>
       <Button type="primary" disabled={isEdit} htmlType="submit">
        Zatwierdź
       </Button>
      </Form>
     )}
    />
   )}
  </StyledWrapper>
 );
};

export default RealizationDates;
