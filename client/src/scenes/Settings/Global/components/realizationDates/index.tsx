import React, { useState } from 'react';
import styled from 'styled-components';
import { RealizationDatesT } from 'services/store/types/settings/Settings';
import { Formik } from 'formik';
import { Form, Button, message } from 'antd';
import Header from 'components/header';
import { useDispatch } from 'react-redux';
import { setSpinner } from 'services/store/actions/view';
import { updateGlobalSettings } from 'services/apiRequests/settings/update';
import { globalSettingsLoaded } from 'services/store/actions/settings';
import FieldNumber from 'components/FormFields/FieldNumber';
import { schema } from './utils/validate';

const StyledWrapper = styled.div`
 width: 400px;
 button {
  margin-right: 10px;
 }
 @media (max-width: 600px) {
  width: 100%;
 }
`;

interface PropsT {
 data: RealizationDatesT | null;
}

const RealizationDates: React.FC<PropsT> = ({ data }) => {
 const dispatch = useDispatch();
 const [isEdit, setIsEdit] = useState(false);

 const handleEdit = () => setIsEdit(!isEdit);
 return (
  <StyledWrapper>
   {data && (
    <Formik
     validationSchema={schema}
     onSubmit={async (values, actions) => {
      dispatch(setSpinner(true));
      await updateGlobalSettings(
       { realizationDates: values },
       data => {
        if (data.realizationDates) actions.setValues(data.realizationDates);
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
     render={props => (
      <Form noValidate className="form-container" onSubmit={props.handleSubmit}>
       <Header title="Terminy realizacji" type="h2" />
       <FieldNumber
        {...props}
        disabled={!isEdit}
        name={`gloss`}
        label="Połysk"
        size="large"
       />
       <FieldNumber
        {...props}
        disabled={!isEdit}
        name={`semiGloss`}
        label="Półmat"
        size="large"
       />
       <FieldNumber
        {...props}
        disabled={!isEdit}
        name={`milling`}
        label="CNC"
        size="large"
       />
       <FieldNumber
        {...props}
        disabled={!isEdit}
        name={`veneer`}
        label="Fornir"
        size="large"
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

export default RealizationDates;
