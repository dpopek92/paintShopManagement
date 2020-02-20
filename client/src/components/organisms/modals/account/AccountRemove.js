import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import Modal from "components/molecules/modal/Modal";
import {
 accountRemove,
 employeeAccountRemove
} from "utils/apiHandlers/account/delete";
import { setSpinner } from "actions/view";
import { logOutUser } from "actions/auth";
import withContext from "hoc/withContext";

const AccountRemove = ({ closeModal, permissionContext }) => {
 const dispatch = useDispatch();

 return (
  <Modal closeModal={closeModal} variant="danger" title="Usuwanie konta">
   <p style={{ color: "red", lineHeight: 1, opacity: 0.5 }}>
    Usunięcie konta powoduje bezpowrotne i nieodwracalne usunięcie danych
    osobowych użytkownika z bazy.
   </p>
   <Formik
    validationSchema={yup.object({
     email: yup.string().email("Format adresu email jest nieprawidłowy")
    })}
    // ONSUBMIT REQUEST
    onSubmit={async (values, actions) => {
     dispatch(setSpinner(true));
     const deleteAccount = {
      email: values.email,
      password: values.password
     };
     if (permissionContext === "employee") {
      await employeeAccountRemove(
       deleteAccount,
       () => {
        dispatch(setSpinner(false));
        dispatch(logOutUser());
       },
       () => {
        dispatch(setSpinner(false));
       }
      );
     } else {
      await accountRemove(
       deleteAccount,
       () => {
        dispatch(setSpinner(false));
        dispatch(logOutUser());
       },
       () => {
        dispatch(setSpinner(false));
       }
      );
     }
    }}
    initialValues={{
     email: "",
     password: ""
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     isSubmitting,
     errors
    }) => (
     <Form noValidate onSubmit={handleSubmit}>
      <Form.Group controlId="formEmailDeleteUser">
       <Form.Control
        required
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={touched.email && !errors.email}
        placeholder="E-mail"
        className={errors.email && touched.email && "is-invalid"}
       />
       {errors.email && touched.email && (
        <div className="invalid">{errors.email}</div>
       )}
      </Form.Group>
      <Form.Group controlId="formPasswordDeleteUser">
       <Form.Control
        required
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Hasło"
        className={errors.password && touched.password && "is-invalid"}
       />
       {errors.password && touched.password && (
        <div className="invalid">{errors.password}</div>
       )}
      </Form.Group>
      <hr />
      <Buttons justify="flex-end">
       <Button
        variant="success"
        type="submit"
        disabled={!values.email || !values.password}
       >
        Usuń
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

AccountRemove.propTypes = {
 closeModal: PropTypes.func,
 permissionContext: PropTypes.string
};

export default withContext(AccountRemove);
