import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import { StyledH3 as Heading } from "components/atoms/heading/Headings";
import { updateUserData } from "utils/apiHandlers/account/update";
import { loadUser } from "actions/auth";
import { setSpinner } from "actions/view";
import { schema } from "const/validateSchema/userData";

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

const UserData = () => {
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
      email: values.email,
      company: values.company,
      postcode: values.postcode,
      city: values.city,
      street: values.street,
      NIP: values.NIP,
      phone: values.phone
     };
     await updateUserData(updateUser, () => {
      dispatch(loadUser());
     });
     dispatch(setSpinner(false));
    }}
    initialValues={{
     firstname: user.firstname,
     surname: user.surname,
     email: user.email,
     company: user.company,
     postcode: user.postcode,
     city: user.city,
     street: user.street,
     NIP: user.NIP,
     phone: user.phone
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
        <StyledWrapper controlId="formPhone">
         {" "}
         <Form.Label>Nr telefonu:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.phone && !errors.phone}
          placeholder="Nr telefonu"
          className={errors.phone && touched.phone && "is-invalid"}
         />
         {errors.phone && touched.phone && (
          <div className="invalid">{errors.phone}</div>
         )}
        </StyledWrapper>
       </div>

       <div>
        <Heading>Dane do FV</Heading>
        <StyledWrapper controlId="formCompany">
         {" "}
         <Form.Label>Nazwa firmy:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="company"
          value={values.company}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.company && !errors.company}
          placeholder="Firma"
          className={errors.company && touched.company && "is-invalid"}
         />
         {errors.company && touched.company && (
          <div className="invalid">{errors.company}</div>
         )}
        </StyledWrapper>

        <StyledWrapper controlId="formPostCode">
         {" "}
         <Form.Label>Kod pocztowy:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="postcode"
          value={values.postcode}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.postcode && !errors.postcode}
          placeholder="Kod pocztowy"
          className={errors.postcode && touched.postcode && "is-invalid"}
         />
         {errors.postcode && touched.postcode && (
          <div className="invalid">{errors.postcode}</div>
         )}
        </StyledWrapper>

        <StyledWrapper controlId="formCity">
         {" "}
         <Form.Label>Miejscowość:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.city && !errors.city}
          placeholder="Miejscowość"
          className={errors.city && touched.city && "is-invalid"}
         />
         {errors.city && touched.city && (
          <div className="invalid">{errors.city}</div>
         )}
        </StyledWrapper>

        <StyledWrapper controlId="formStreet">
         {" "}
         <Form.Label>Ulica:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="street"
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.street && !errors.street}
          placeholder="Ulica"
          className={errors.street && touched.street && "is-invalid"}
         />
         {errors.street && touched.street && (
          <div className="invalid">{errors.street}</div>
         )}
        </StyledWrapper>

        <StyledWrapper controlId="formNIP">
         {" "}
         <Form.Label>NIP:</Form.Label>
         <Form.Control
          disabled={!isEdit}
          required
          type="text"
          name="NIP"
          value={values.NIP}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.NIP && !errors.NIP}
          placeholder="NIP"
          className={errors.NIP && touched.NIP && "is-invalid"}
         />
         {errors.NIP && touched.NIP && (
          <div className="invalid">{errors.NIP}</div>
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

// UserData.propTypes = {};

export default UserData;
