import React, { useState } from 'react';
import styled from 'styled-components';
import { PricesT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button } from 'antd';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import CompanyMaterial from './components/companyMaterial';
import CustomerMaterial from './components/customerMaterial';
import ServicesFields from './components/servicesFields';

interface PropsT {
 values: PricesT | null;
}

// LAKIEROWANIE UCHWYTU PRZERZUCIĆ DO CUSTOMER_MATERIAL (25ZL)

const Prices: React.FC<PropsT> = ({ values }) => {
 const [isEdit, setIsEdit] = useState(false);

 const handleEdit = () => setIsEdit(!isEdit);
 console.log(values);
 return (
  <div>
   {values && (
    <Formik
     //  validationSchema={schema}
     onSubmit={values => {
      console.log(values);
     }}
     initialValues={values}
     render={props => {
      return (
       <>
        <Form
         noValidate
         className="form-container"
         onSubmit={props.handleSubmit}
        >
         <div>
          {values.companyMaterial && (
           <CompanyMaterial
            {...props}
            values={values.companyMaterial}
            disabled={!isEdit}
           />
          )}
          {values.customerMaterial && (
           <CustomerMaterial
            {...props}
            values={values.customerMaterial}
            disabled={!isEdit}
           />
          )}
          {values.services && (
           <ServicesFields
            {...props}
            values={values.services}
            disabled={!isEdit}
           />
          )}
         </div>
         <Button onClick={handleEdit}>Edytuj</Button>
         <Button type="primary" disabled={!isEdit} htmlType="submit">
          Zatwierdź
         </Button>
        </Form>
       </>
      );
     }}
    />
   )}
  </div>
 );
};

export default Prices;
