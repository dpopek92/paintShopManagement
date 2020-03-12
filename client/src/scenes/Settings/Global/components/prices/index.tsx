import React, { useState } from 'react';
import styled from 'styled-components';
import { PricesT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button, message } from 'antd';
import CompanyMaterial from './components/companyMaterial';
import CustomerMaterial from './components/customerMaterial';
import ServicesFields from './components/servicesFields';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'services/store/actions/view';
import { updateGlobalSettings } from 'services/apiRequests/settings/update';
import { globalSettingsLoaded } from 'services/store/actions/settings';

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
}

const Prices: React.FC<PropsT> = ({ data }) => {
 const dispatch = useDispatch();
 const [isEdit, setIsEdit] = useState(false);

 const handleEdit = () => setIsEdit(!isEdit);

 return (
  <div>
   {data && (
    <Formik
     //  validationSchema={schema}
     onSubmit={async (values, actions) => {
      dispatch(setSpinner(true));
      await updateGlobalSettings(
       { prices: values },
       data => {
        if (data.prices) actions.setValues(data.prices);
        dispatch(globalSettingsLoaded(data));
        setIsEdit(false);
        dispatch(setSpinner(false));
        message.success('Dane zostały zaktualizowane');
       },
       () => {
        dispatch(setSpinner(false));
        message.error('Błąd serwera');
       },
      );
     }}
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
