import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import { StyledH3 as Heading } from "components/atoms/heading/Headings";
import { updateEmployeeProfile } from "utils/apiHandlers/account/update";
import { loadUser } from "actions/auth";
import { setSpinner } from "actions/view";
import { schema } from "const/validateSchema/employeeData";

const StyledWrapper = styled(Form.Group)`
 margin: 5px 30px 5px 0;
 display: flex;
 input {
  width: 300px;
 }
 label {
  width: 200px;
 }
 &:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
 }
 @media (max-width: 600px) {
  margin: 5px auto;
  flex-direction: column;
  text-align: center;
  input {
   width: 100%;
  }
  label {
   width: 100%;
  }
 }
`;

const EmployeeData = () => {
 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 const [isEdit, setIsEdit] = useState(false);

 return (
  <div>
   <Formik
    validationSchema={schema}
    // ONSUBMIT REQUEST
    onSubmit={async values => {
     dispatch(setSpinner(true));
     const updateUser = {
      firstname: values.firstname,
      surname: values.surname,
      email: values.email
     };
     await updateEmployeeProfile(user._id, updateUser, () => {
      dispatch(loadUser());
     });
     dispatch(setSpinner(false));
    }}
    initialValues={{
     firstname: user.firstname,
     surname: user.surname,
     email: user.email
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
      <Row justify="flex-start">
       <div>
        <Heading>Dane osobowe</Heading>
        <StyledWrapper controlId="formName">
         <Form.Label>Imię:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.firstname && !errors.firstname}
          placeholder="Imię"
          className={errors.firstname && touched.firstname && "is-invalid"}
         />
         {errors.firstname && touched.firstname && (
          <div className="invalid">{errors.firstname}</div>
         )}
        </StyledWrapper>

        <StyledWrapper controlId="formSurame">
         {" "}
         <Form.Label>Nazwisko:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="surname"
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.surname && !errors.surname}
          placeholder="Nazwisko"
          className={errors.surname && touched.surname && "is-invalid"}
         />
         {errors.surname && touched.surname && (
          <div className="invalid">{errors.surname}</div>
         )}
        </StyledWrapper>

        <StyledWrapper controlId="formEmail">
         {" "}
         <Form.Label>E-mail:</Form.Label>
         <Form.Control
          disabled={!isEdit}
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
        </StyledWrapper>

        <Row justify="flex-end">
         <Button variant="success" type="submit" disabled={!isEdit}>
          Zatwiedź
         </Button>
         <Button
          variant={isEdit ? "outline-secondary" : "secondary"}
          onClick={() => setIsEdit(!isEdit)}
         >
          {isEdit ? "Zablokuj edycję" : "Edytuj"}
         </Button>
        </Row>
       </div>
      </Row>
     </Form>
    )}
   />
  </div>
 );
};

// EmployeeData.propTypes = {};

export default EmployeeData;
