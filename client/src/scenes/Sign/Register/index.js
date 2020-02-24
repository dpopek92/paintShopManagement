import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import AuthTemplate from 'components/templates/authTemplate';
import Header from 'components/header';
import { schema } from './utils/validate';
import FormField from '../components/FormField';
import FormCheckbox from './components/FormCheckbox';
import { createNewAccount } from 'services/apiRequests/user/post';
import Success from './components/Modals/Success';

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
 text-align: ${({ align }) => align || 'right'};
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

const Register = () => {
 const history = useHistory();

 const handleSubmit = async (values, action) => {
  await createNewAccount(
   values,
   () => {
    // spinner
    Success({ onOk: () => history.push('/login') });
   },
   errors => {
    action.setErrors(errors);
   },
  );
 };
 return (
  <AuthTemplate>
   <StyledWrapper>
    <div>
     <Header title="Rejestracja" />
     <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      validate={values => {
       const errors = {};
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
         <FormField
          {...props}
          placeholder="Imię*"
          name="firstname"
          type="firstname"
          required
         />
         <FormField
          {...props}
          placeholder="Nazwisko"
          name="surname"
          type="surname"
         />
         <FormField
          {...props}
          placeholder="Nazwa firmy*"
          name="company"
          type="company"
          required
         />
         <FormField
          {...props}
          placeholder="E-mail*"
          name="email"
          type="email"
         />
         <FormField
          {...props}
          placeholder="Hasło*"
          name="password"
          type="password"
          required
         />
         <FormField
          {...props}
          placeholder="Powtórz hasło"
          name="password2"
          type="password"
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
  </AuthTemplate>
 );
};

export default Register;
