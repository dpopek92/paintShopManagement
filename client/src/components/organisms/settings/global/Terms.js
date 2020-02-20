import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { loadGlobalSettings } from "actions/settings";
import { updateFinishTerms } from "utils/apiHandlers/settings/update";
import { schema } from "const/validateSchema/FinishTerms";
import { signal } from "const/";

const StyledWrapper = styled(Form.Group)`
 margin: 5px 30px 5px 0;
 display: flex;
 input {
  width: 100px;
 }
 label {
  width: 300px;
 }
 &:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
 }
 margin: 5px auto;
 input {
  width: 70px;
 }
 label {
  width: 250px;
 }
`;

const Terms = props => {
 const dispatch = useDispatch();
 const finishTerm = useSelector(state => state.settings.finishTerm);
 const [isEdit, setIsEdit] = useState(false);

 return (
  <div>
   <Formik
    validationSchema={schema}
    // ONSUBMIT REQUEST
    onSubmit={async values => {
     dispatch(setSpinner(true));
     const updateTerms = {
      dateVeneer: values.dateVeneer,
      dateMilling: values.dateMilling,
      dateGloss: values.dateGloss,
      dateSemigloss: values.dateSemigloss
     };
     await updateFinishTerms(
      updateTerms,
      () => dispatch(loadGlobalSettings(() => dispatch(setSpinner(false)))),
      signal.token
     );
    }}
    initialValues={{
     dateVeneer: finishTerm.dateVeneer,
     dateMilling: finishTerm.dateMilling,
     dateGloss: finishTerm.dateGloss,
     dateSemigloss: finishTerm.dateSemigloss
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     isSubmitting,
     errors
    }) => {
     // console.log(paintMaker);
     // console.log(values);
     return (
      <Form noValidate onSubmit={handleSubmit}>
       <Row justify="flex-start">
        <div>
         <StyledWrapper controlId="formSemigloss">
          {" "}
          <Form.Label>Półmat/Mat:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="dateSemigloss"
           value={values.dateSemigloss}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.dateSemigloss && !errors.dateSemigloss}
           placeholder="-"
           className={
            errors.dateSemigloss && touched.dateSemigloss && "is-invalid"
           }
          />
          {errors.dateSemigloss && touched.dateSemigloss && (
           <div className="invalid">{errors.dateSemigloss}</div>
          )}
         </StyledWrapper>
         <StyledWrapper controlId="formGloss">
          <Form.Label>Połysk:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           // edit
           type="text"
           name="dateGloss"
           value={values.dateGloss}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.dateGloss && !errors.dateGloss}
           placeholder="-"
           className={errors.dateGloss && touched.dateGloss && "is-invalid"}
          />
          {errors.dateGloss && touched.dateGloss && (
           <div className="invalid">{errors.dateGloss}</div>
          )}
         </StyledWrapper>

         <StyledWrapper controlId="formMilling">
          {" "}
          <Form.Label>Fronty frezowane:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="dateMilling"
           value={values.dateMilling}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.dateMilling && !errors.dateMilling}
           placeholder="-"
           className={errors.dateMilling && touched.dateMilling && "is-invalid"}
          />
          {errors.dateMilling && touched.dateMilling && (
           <div className="invalid">{errors.dateMilling}</div>
          )}
         </StyledWrapper>
         <StyledWrapper controlId="formVeneer">
          {" "}
          <Form.Label>Fronty fornirowane:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="dateVeneer"
           value={values.dateVeneer}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.dateVeneer && !errors.dateVeneer}
           placeholder="-"
           className={errors.dateVeneer && touched.dateVeneer && "is-invalid"}
          />
          {errors.dateVeneer && touched.dateVeneer && (
           <div className="invalid">{errors.dateVeneer}</div>
          )}
         </StyledWrapper>

         <Row justify="flex-end">
          <Button variant="success" type="submit" disabled={!isEdit}>
           Zatwierdź
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
     );
    }}
   />
  </div>
 );
};

Terms.propTypes = {};

export default Terms;
