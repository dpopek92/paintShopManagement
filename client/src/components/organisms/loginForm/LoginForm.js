import React from 'react';
import PropTypes from 'prop-types';
import Row from 'templates/FlexRowTemplate';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { schema } from 'const/validateSchema/loginForm';

const LoginForm = ({ handleAuth }) => {
 return (
  <div>
   <Formik
    validationSchema={schema}
    // ONSUBMIT REQUEST
    onSubmit={async (values, actions) => {
     const authUser = {
      email: values.email,
      password: values.password,
     };
     await handleAuth(authUser, actions);
    }}
    initialValues={{
     email: '',
     password: '',
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     errors,
    }) => (
     <Form noValidate onSubmit={handleSubmit}>
      {/* SPINNER */}

      <Form.Group controlId="formEmail">
       <Form.Control
        required
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.email && !errors.email}
        placeholder="Adres email*"
        className={errors.email && touched.email && 'is-invalid'}
       />
       {errors.email && touched.email && (
        <div className="invalid">{errors.email}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formPassword">
       <Form.Control
        required
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password && !errors.password}
        placeholder="Hasło*"
        className={errors.password && touched.password && 'is-invalid'}
       />
       {errors.password && touched.password && (
        <div className="invalid">{errors.password}</div>
       )}
      </Form.Group>
      <Row justify="flex-start">
       <Button
        type="submit"
        variant="success"
        style={{ margin: 0, letterSpacing: 2 }}
       >
        Zaloguj
       </Button>
      </Row>

      <Form.Text className="text-muted" style={{ textAlign: 'right' }}>
       Nie posiadasz konta?{' '}
       <Link to="/register" className="text--signin">
        <span>Załóż je!</span>
       </Link>
      </Form.Text>

      <Form.Text style={{ textAlign: 'right' }}>
       <Link to="/passwordremind" style={{ color: 'grey' }}>
        <span>Nie pamiętam hasła</span>
       </Link>
      </Form.Text>
     </Form>
    )}
   />
  </div>
 );
};

LoginForm.propTypes = {
 handleAuth: PropTypes.func,
};

export default LoginForm;
