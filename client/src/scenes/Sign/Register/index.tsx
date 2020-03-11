import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Form, Button } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import Header from 'components/header';
import { createNewAccount } from 'services/apiRequests/user/post';
import { schema } from './utils/validate';
import FormCheckbox from './components/FormCheckbox';
import Success from './components/Modals/Success';
import { useDispatch, useSelector } from 'react-redux';
import { setSpinner } from 'services/store/actions/view';
import { AppState } from 'services/store';
import FormFieldInput from 'components/FormFields/FormFieldInput';
import FormFieldPassword from 'components/FormFields/FormFieldPassword';

const StyledWrapper = styled.div`
 padding: 30px;
 display: flex;
 justify-content: center;
 div {
  max-width: 400px;
 }
`;
const StyledButton = styled(Button)`
 width: 100%;
`;
const StyledText = styled.div`
 text-align: ${({ align }: { align: string }) => align || 'right'};
 margin-bottom: 5px;
`;

const initValues = {
 firstname: '',
 surname: '',
 company: '',
 email: '',
 password: '',
 password2: '',
 rodo: false,
 reg: false,
 msg: false,
};

interface Values {
 firstname: string;
 surname: string;
 company: string;
 email: string;
 password: string;
 password2: string;
 rodo: boolean;
 reg: boolean;
 msg: boolean;
}
interface Errors {
 [key: string]: string;
}

const Register = () => {
 const dispatch = useDispatch();
 const history = useHistory();
 const isAuthenticated: boolean = useSelector(
  (state: AppState) => state.auth.isAuthenticated,
 );
 const { token } = localStorage;
 if (token && isAuthenticated) {
  return <Redirect to="/" />;
 }

 const handleSubmit = async (values: Values, action: any) => {
  dispatch(setSpinner(true));
  await createNewAccount(
   values,
   () => {
    dispatch(setSpinner(false));
    Success({ onOk: () => history.push('/login') });
   },
   (errors: Errors) => {
    dispatch(setSpinner(false));
    action.setErrors(errors);
   },
  );
 };
 return (
  <StyledWrapper>
   <div>
    <Header title="Rejestracja" type="h1" />
    <Formik
     validationSchema={schema}
     onSubmit={handleSubmit}
     validate={values => {
      const errors: any = {};
      if (values.password2 !== values.password) {
       errors.password2 = 'Hasła muszą być identyczne';
      }
      return errors;
     }}
     initialValues={initValues}
     render={props => {
      return (
       <Form
        noValidate
        className="form-container"
        onSubmit={props.handleSubmit}
       >
        <FormFieldInput
         {...props}
         placeholder="Imię*"
         name="firstname"
         required
        />
        <FormFieldInput {...props} placeholder="Nazwisko" name="surname" />
        <FormFieldInput
         {...props}
         placeholder="Nazwa firmy*"
         name="company"
         required
        />
        <FormFieldInput
         {...props}
         placeholder="E-mail*"
         name="email"
         type="email"
        />
        <FormFieldPassword
         {...props}
         placeholder="Hasło*"
         name="password"
         required
        />
        <FormFieldPassword
         {...props}
         placeholder="Powtórz hasło"
         name="password2"
         required
        />

        <FormCheckbox {...props} name="rodo" />
        <FormCheckbox {...props} name="reg" />
        <FormCheckbox {...props} name="msg" />

        <StyledText align="left">
         <small>* - pola wymagane</small>
        </StyledText>
        <StyledButton htmlType="submit" type="primary" size="large">
         Utwórz konto
        </StyledButton>
       </Form>
      );
     }}
    />
   </div>
  </StyledWrapper>
 );
};

export default Register;
