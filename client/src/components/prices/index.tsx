import React, { useState } from 'react';
import styled from 'styled-components';
import { PricesT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button } from 'antd';
import CompanyMaterial from './components/companyMaterial';
import CustomerMaterial from './components/customerMaterial';
import ServicesFields from './components/servicesFields';

const StyledContainer = styled.div`
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 width: 100%;
`;
const StyledWrapper = styled.div`
 width: 33%;
 @media (max-width: 1280px) {
  width: 50%;
 }
 @media (max-width: 768px) {
  width: 100%;
 }
`;
const StyledForm = styled(Form)`
 button {
  margin-right: 10px;
 }
`;

interface PropsT {
 data: PricesT | null;
 handleSubmit: (values: PricesT, actions: any, setIsEdit: any) => void;
}

const Prices: React.FC<PropsT> = ({ data, handleSubmit }) => {
 const [isEdit, setIsEdit] = useState(false);

 const handleEdit = () => setIsEdit(!isEdit);

 return (
  <div>
   {data && (
    <Formik
     //  validationSchema={schema}
     onSubmit={async (values, actions) =>
      handleSubmit(values, actions, setIsEdit)
     }
     initialValues={data}
     render={props => {
      const { values, handleSubmit } = props;
      return (
       <>
        <StyledForm
         noValidate
         className="form-container"
         onSubmit={handleSubmit}
        >
         <StyledContainer>
          <StyledWrapper>
           {values.companyMaterial && (
            <CompanyMaterial
             {...props}
             values={values.companyMaterial}
             disabled={!isEdit}
            />
           )}
          </StyledWrapper>
          <StyledWrapper>
           {values.customerMaterial && (
            <CustomerMaterial
             {...props}
             values={values.customerMaterial}
             disabled={!isEdit}
            />
           )}
          </StyledWrapper>
          <StyledWrapper>
           {values.services && (
            <ServicesFields
             {...props}
             values={values.services}
             disabled={!isEdit}
            />
           )}
          </StyledWrapper>
         </StyledContainer>
         <Button onClick={handleEdit}>Edytuj</Button>
         <Button type="primary" disabled={!isEdit} htmlType="submit">
          Zatwierdź
         </Button>
        </StyledForm>
       </>
      );
     }}
    />
   )}
  </div>
 );
};

export default Prices;
