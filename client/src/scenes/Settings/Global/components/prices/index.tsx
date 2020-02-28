import React, { useState } from 'react';
import styled from 'styled-components';
import { PricesT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button } from 'antd';
import FormFieldNumber from 'components/FormFields/FormFieldNumber';
import CompanyMaterial from './components/companyMaterial';

interface PropsT {
 values: PricesT | null;
}

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
      console.log(props);
      return (
       <>
        <Form
         noValidate
         className="form-container"
         onSubmit={props.handleSubmit}
        >
         <div>
          {values.companyMaterial && (
           <CompanyMaterial {...props} data={values.companyMaterial} />
          )}
          {/* /|\ to do poprawy */}
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
