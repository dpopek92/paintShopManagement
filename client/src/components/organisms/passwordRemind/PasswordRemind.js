import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { schema } from 'const/validateSchema/passwordRemindForm';

const PasswordRemind = ({ handlePasswordRemind }) => {
 return (
  <div>
   <Formik
    validationSchema={schema}
    // ONSUBMIT REQUEST
    onSubmit={async values => {
     await handlePasswordRemind(values.email);
    }}
    initialValues={{
     email: '',
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

      <Button
       type="submit"
       variant="success"
       style={{ margin: 0, letterSpacing: 2 }}
      >
       Wyślij
      </Button>

      <Form.Text className="text-muted" style={{ textAlign: 'right' }}>
       Nie posiadasz konta?{' '}
       <Link to="/register" className="text--signin">
        <span>Załóż je!</span>
       </Link>
      </Form.Text>
     </Form>
    )}
   />
  </div>
 );
};

PasswordRemind.propTypes = {
 handlePasswordRemind: PropTypes.func,
};

export default PasswordRemind;
