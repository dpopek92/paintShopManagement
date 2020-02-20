import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import {
 passwordUpdate,
 employeePasswordUpdate
} from "utils/apiHandlers/account/update";
import { setSpinner } from "actions/view";
import { schema } from "const/validateSchema/passwordChange";
import withContext from "hoc/withContext";

const PasswordChange = ({ closeModal, permissionContext }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleValidate = values => {
  let errors = {};
  if (values.password2 !== values.password) {
   errors.password2 = "Nowe hasła muszą być identyczne";
  }
  return errors;
 };
 return (
  <Modal closeModal={closeModal} title="Zmiana hasła">
   <Formik
    validationSchema={schema}
    validate={values => handleValidate(values)}
    // ONSUBMIT REQUEST
    onSubmit={async (values, { setErrors }) => {
     dispatch(setSpinner(true));
     const changePassword = {
      currentPassword: values.currentPassword,
      newPassword: values.password
     };
     if (permissionContext === "employee") {
      await employeePasswordUpdate(
       changePassword,
       () => {
        dispatch(setSpinner(false));
        closeModal();
       },
       msg => {
        dispatch(setSpinner(false));
        setErrors({ currentPassword: msg });
       }
      );
     } else {
      await passwordUpdate(
       changePassword,
       () => {
        dispatch(setSpinner(false));
        closeModal();
       },
       msg => {
        dispatch(setSpinner(false));
        setErrors({ currentPassword: msg });
       }
      );
     }
    }}
    initialValues={{
     currentPassword: "",
     password: "",
     password2: ""
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
      <Form.Group controlId="formCurrentPassword">
       <Form.Control
        required
        type="password"
        name="currentPassword"
        value={values.currentPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.currentPassword && !errors.currentPassword}
        placeholder="Aktualne hasło*"
        className={
         errors.currentPassword && touched.currentPassword && "is-invalid"
        }
       />
       {errors.currentPassword && touched.currentPassword && (
        <div className="invalid">{errors.currentPassword}</div>
       )}
      </Form.Group>

      <Form.Group controlId="formPasswordChange">
       <Form.Control
        required
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.password && !errors.password}
        placeholder="Nowe hasło*"
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
        placeholder="Powtórz nowe hasło*"
        className={errors.password2 && touched.password2 && "is-invalid"}
       />
       {errors.password2 && touched.password2 && (
        <div className="invalid">{errors.password2}</div>
       )}
      </Form.Group>
      <hr />
      <Buttons justify="flex-end">
       <Button variant="success" type="submit">
        Zatwierdź
       </Button>
       <Button variant="danger" onClick={closeModal}>
        Anuluj
       </Button>
      </Buttons>
     </Form>
    )}
   />
  </Modal>
 );
};

PasswordChange.propTypes = {
 closeModal: PropTypes.func,
 permissionContext: PropTypes.string
};

export default withContext(PasswordChange);
