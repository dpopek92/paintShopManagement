import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { schema } from "const/validateSchema/registerForm";

const StyledInfo = styled.p`
 font-size: 10px;
 line-height: 10px;
 margin-bottom: 2px;
`;

const regulations = () => {
 const first = (
  <>
   <StyledInfo>
    Wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę: BLOW
    Meble, NIP: 534 225 05 99, REGON: 144019841, w celu założenia i utrzymywania
    mojego konta użytkownika na warunkach opisanych w
    <a href="/regulations"> regulaminie</a> i przy zachowaniu przepisów
    rozporządzenia o ochronie danych osobowych (RODO). Zostałem poinformowany,
    że zgodę mogę wycofać w dowolnym momencie. Zostałem poinformowany, że mam
    prawo wglądu, poprawiania oraz żądania usunięcia moich danych osobowych w
    dowolnej chwili. *
   </StyledInfo>
  </>
 );

 return first;
};
const reg = () => {
 const first = (
  <>
   <StyledInfo>
    Zapoznałem się z<a href="/regulations">regulaminem. *</a>
   </StyledInfo>
  </>
 );

 return first;
};
const emailreg = () => {
 const first = (
  <>
   <StyledInfo>
    Wyrażam zgodę na otrzymywanie wiadomości e-mail z informacjami na temat
    moich zamówień.
   </StyledInfo>
  </>
 );
 return first;
};

const RegisterForm = ({ handleRegister }) => {
 return (
  <div>
   <Formik
    validationSchema={schema}
    validate={values => {
     const errors = {};
     if (values.password2 !== values.password) {
      errors.password2 = "Hasła muszą być identyczne";
     }
     return errors;
    }}
    // ONSUBMIT REQUEST
    onSubmit={async (values, actions) => {
     const newUser = {
      firstname: values.firstname,
      surname: values.surname,
      company: values.company,
      email: values.email,
      password: values.password
     };
     await handleRegister(newUser, actions);
    }}
    initialValues={{
     firstname: "",
     surname: "",
     company: "",
     email: "",
     password: "",
     password2: "",
     rodo: "",
     reg: "",
     msg: ""
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     errors
    }) => (
     <Form noValidate onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
       <Form.Control
        required
        type="text"
        name="firstname"
        value={values.firstname}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.firstname && !errors.firstname}
        placeholder="Imię*"
        className={errors.firstname && touched.firstname && "is-invalid"}
       />
       {errors.firstname && touched.firstname && (
        <div className="invalid">{errors.firstname}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formSurame">
       <Form.Control
        type="text"
        name="surname"
        value={values.surname}
        onChange={handleChange}
        placeholder="Nazwisko"
       />
      </Form.Group>

      <Form.Group controlId="formCompany">
       <Form.Control
        required
        type="text"
        name="company"
        value={values.company}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.company && !errors.company}
        placeholder="Nazwa firmy*"
        className={errors.company && touched.company && "is-invalid"}
       />
       {errors.company && touched.company && (
        <div className="invalid">{errors.company}</div>
       )}
      </Form.Group>

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
        className={errors.email && touched.email && "is-invalid"}
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
        className={errors.password && touched.password && "is-invalid"}
       />
       {errors.password && touched.password && (
        <div className="invalid">{errors.password}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
       <Form.Control
        required
        type="password"
        name="password2"
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password2 && !errors.password2}
        placeholder="Powtórz hasło*"
        className={errors.password2 && touched.password2 && "is-invalid"}
       />
       {errors.password2 && touched.password2 && (
        <div className="invalid">{errors.password2}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formCheckboxRODO" style={{ marginBottom: 0 }}>
       <Form.Check
        type="checkbox"
        required
        name="rodo"
        onChange={handleChange}
        onBlur={handleBlur}
        className="text-muted"
        label={regulations()}
       />
       {errors.rodo && <div className="invalid">{errors.rodo}</div>}
      </Form.Group>

      <Form.Group controlId="formChecboxREG" style={{ marginBottom: 0 }}>
       <Form.Check
        type="checkbox"
        required
        name="reg"
        onChange={handleChange}
        onBlur={handleBlur}
        className="text-muted"
        label={reg()}
       />
       {errors.reg && <div className="invalid">{errors.reg}</div>}
      </Form.Group>

      <Form.Group controlId="formChecboxMSG" style={{ marginBottom: 0 }}>
       <Form.Check
        type="checkbox"
        required
        name="msg"
        onChange={handleChange}
        onBlur={handleBlur}
        className="text-muted"
        label={emailreg()}
       />
       {errors.msg && <div className="invalid">{errors.msg}</div>}
      </Form.Group>

      <Form.Text className="text-muted text--required">
       * - pola wymagane
      </Form.Text>

      <Button type="submit" className="button--wide" variant="secondary">
       Zarejestruj
      </Button>
     </Form>
    )}
   />
  </div>
 );
};

RegisterForm.propTypes = {};

export default RegisterForm;
