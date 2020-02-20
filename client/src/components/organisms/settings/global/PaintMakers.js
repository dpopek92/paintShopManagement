import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import Row from "templates/FlexRowTemplate";
import { setSpinner } from "actions/view";
import { loadGlobalSettings } from "actions/settings";
import { updatePaintMakers } from "utils/apiHandlers/settings/update";
import { schema } from "const/validateSchema/PaintMakers";
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

const PaintMakers = () => {
 const dispatch = useDispatch();
 const paintMaker = useSelector(state => state.settings.paintMaker);
 const [isEdit, setIsEdit] = useState(false);

 return (
  <div>
   <Formik
    validationSchema={schema}
    // ONSUBMIT REQUEST
    onSubmit={async values => {
     dispatch(setSpinner(true));
     const PaintMakersValues = {
      paintGloss: values.paintGloss,
      paintSemigloss: values.paintSemigloss,
      paintBase: values.paintBase
     };
     await updatePaintMakers(PaintMakersValues, () => {
      dispatch(
       loadGlobalSettings(() => dispatch(setSpinner(false)), signal.token)
      );
     });
    }}
    initialValues={{
     paintGloss: paintMaker.Gloss,
     paintSemigloss: paintMaker.Semigloss,
     paintBase: paintMaker.Base
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     errors
    }) => {
     return (
      <Form noValidate onSubmit={handleSubmit}>
       <Row justify="flex-start">
        <div>
         <StyledWrapper controlId="formGloss">
          <Form.Label>Połysk:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="paintGloss"
           value={values.paintGloss}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.paintGloss && !errors.paintGloss}
           placeholder="-"
           className={errors.paintGloss && touched.paintGloss && "is-invalid"}
          />
          {errors.paintGloss && touched.paintGloss && (
           <div className="invalid">{errors.paintGloss}</div>
          )}
         </StyledWrapper>
         <StyledWrapper controlId="formSemigloss">
          {" "}
          <Form.Label>Półmat/Mat:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="paintSemigloss"
           value={values.paintSemigloss}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.paintSemigloss && !errors.paintSemigloss}
           placeholder="-"
           className={
            errors.paintSemigloss && touched.paintSemigloss && "is-invalid"
           }
          />
          {errors.paintSemigloss && touched.paintSemigloss && (
           <div className="invalid">{errors.paintSemigloss}</div>
          )}
         </StyledWrapper>
         <StyledWrapper controlId="formBase">
          {" "}
          <Form.Label>Podkład:</Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="paintBase"
           value={values.paintBase}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.paintBase && !errors.paintBase}
           placeholder="-"
           className={errors.paintBase && touched.paintBase && "is-invalid"}
          />
          {errors.paintBase && touched.paintBase && (
           <div className="invalid">{errors.paintBase}</div>
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

// PaintMakers.propTypes = {};

export default PaintMakers;
