import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Icon } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import Header from 'components/header';
import { schema } from './utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { setSpinner } from 'services/store/actions/view';
import { authUser } from 'services/apiRequests/auth/get';
import {
 logInSuccess,
 loadUserData,
 logInFail,
} from 'services/store/actions/auth';
import { AppState } from 'services/store';
import FormFieldInput from 'components/FormFields/FormFieldInput';
import FormFieldPassword from 'components/FormFields/FormFieldPassword';

const StyledWrapper = styled.div`
 padding: 30px;
 display: flex;
 justify-content: center;
`;
const StyledButton = styled(Button)`
 width: 100%;
`;
const StyledText = styled.div`
 text-align: ${({ align }: { align?: string }) => align || 'right'};
 margin-bottom: 5px;
`;

interface Values {
 email: string;
 password: string;
}

const Login = () => {
 const dispatch = useDispatch();
 const isAuthenticated: boolean = useSelector(
  (state: AppState) => state.auth.isAuthenticated,
 );
 const { token } = localStorage;
 if (token && isAuthenticated) {
  return <Redirect to="/" />;
 }

 const handleSubmit = async (values: Values, actions: any) => {
  dispatch(setSpinner(true));
  await authUser(
   values,
   token => {
    dispatch(logInSuccess(token));
    dispatch(loadUserData());
    dispatch(setSpinner(false));
   },
   errors => {
    dispatch(logInFail());
    actions.setErrors(errors);
    dispatch(setSpinner(false));
   },
  );
 };
 return (
  <StyledWrapper>
   <div>
    <Header title="Panel logowania" />
    <Formik
     validationSchema={schema}
     // ONSUBMIT REQUEST
     onSubmit={handleSubmit}
     initialValues={{
      email: '',
      password: '',
     }}
     render={props => (
      <Form noValidate className="form-container" onSubmit={props.handleSubmit}>
       <FormFieldInput
        {...props}
        placeholder="E-mail"
        name="email"
        type="email"
        required
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
       />
       <FormFieldPassword
        {...props}
        placeholder="Hasło"
        name="password"
        required
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
       />
       <StyledText>
        <Link to="/passwordremind">Nie pamiętam hasła</Link>
       </StyledText>
       <StyledButton htmlType="submit" type="primary" size="large">
        Zaloguj
       </StyledButton>
       <StyledText align="left">
        <small>
         Nie posiadasz konta? <Link to="/register">Załóż je!</Link>
        </small>
       </StyledText>
      </Form>
     )}
    />
   </div>
  </StyledWrapper>
 );
};

export default Login;
