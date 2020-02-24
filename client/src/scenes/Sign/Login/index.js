import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Icon } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import AuthTemplate from 'components/templates/authTemplate';
import Header from 'components/header';
import { schema } from './utils/validate';
import FormField from '../components/FormField';

const StyledWrapper = styled.div`
 padding: 30px;
 display: flex;
 justify-content: center;
`;
const StyledButton = styled(Button)`
 width: 100%;
`;
const StyledText = styled.div`
 text-align: ${({ align }) => align || 'right'};
 margin-bottom: 5px;
`;

const Login = () => {
 return (
  <AuthTemplate>
   <StyledWrapper>
    <div>
     <Header title="Panel logowania" />
     <Formik
      validationSchema={schema}
      // ONSUBMIT REQUEST
      onSubmit={async (values, actions) => {}}
      initialValues={{
       email: '',
       password: '',
      }}
      render={props => (
       <Form
        noValidate
        className="form-container"
        onSubmit={props.handleSubmit}
       >
        <FormField
         {...props}
         placeholder="E-mail"
         name="email"
         type="email"
         required
         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <FormField
         {...props}
         placeholder="Hasło"
         name="password"
         type="password"
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
  </AuthTemplate>
 );
};

export default Login;
