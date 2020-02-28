import React, { useState } from 'react';
import styled from 'styled-components';
import { PaintsProducersT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button } from 'antd';
import FormFieldInput from 'components/FormFields/FormFieldInput';

const StyledWrapper = styled.div`
 width: 300px;
 button {
  margin-right: 10px;
 }
`;

interface PropsT {
 values: PaintsProducersT | null;
}

const PaintsProducers: React.FC<PropsT> = ({ values }) => {
 const [isEdit, setIsEdit] = useState(false);

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
       <FormFieldInput
        {...props}
        label="Połysk"
        name="gloss"
        size="large"
        disabled={!isEdit}
        required
       />
       <FormFieldInput
        {...props}
        label="Półmat"
        name="semiGloss"
        size="large"
        disabled={!isEdit}
        required
       />
       <FormFieldInput
        {...props}
        label="Podkład"
        name="base"
        size="large"
        disabled={!isEdit}
        required
       />
       <Button onClick={handleEdit}>Edytuj</Button>
       <Button type="primary" disabled={!isEdit} htmlType="submit">
        Zatwierdź
       </Button>
      </Form>
     )}
    />
   )}
  </StyledWrapper>
 );
};

export default PaintsProducers;
