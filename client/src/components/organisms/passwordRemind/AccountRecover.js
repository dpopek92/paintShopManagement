import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { schema } from 'const/validateSchema/passwordChange';

const AccountRecover = ({ handlePasswordChange }) => {
 return (
  <div>
   <Formik
    validationSchema={schema}
    validate={values => {
     const errors = {};
     if (values.password2 !== values.password) {
      errors.password2 = 'Hasła muszą być identyczne';
     }
     return errors;
    }}
    // ONSUBMIT REQUEST
    onSubmit={async values => {
     await handlePasswordChange(values.password);
    }}
    initialValues={{
     password: '',
     password2: '',
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

      <Form.Group controlId="formPassword">
       <Form.Control
        required
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password && !errors.password}
        placeholder="Hasło"
        className={errors.password && touched.password && 'is-invalid'}
       />
       {errors.password && touched.password && (
        <div className="invalid">{errors.password}</div>
       )}
      </Form.Group>
      <Form.Group controlId="formPassword">
       <Form.Control
        required
        type="password"
        name="password2"
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password2 && !errors.password2}
        placeholder="Powtórz hasło"
        className={errors.password2 && touched.password2 && 'is-invalid'}
       />
       {errors.password2 && touched.password2 && (
        <div className="invalid">{errors.password2}</div>
       )}
      </Form.Group>

      <Button
       type="submit"
       variant="success"
       style={{ margin: 0, letterSpacing: 2 }}
      >
       Wyślij
      </Button>
     </Form>
    )}
   />
  </div>
 );
};

AccountRecover.propTypes = {
 handlePasswordChange: PropTypes.func,
};

export default AccountRecover;
