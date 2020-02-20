import React, { useState } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import {
 StyledH3 as Heading,
 StyledH6,
} from 'components/atoms/heading/Headings';
import Row from 'templates/FlexRowTemplate';
import { setSpinner } from 'actions/view';
import { loadPrices } from 'actions/prices';
import { updateGlobalPrices } from 'utils/apiHandlers/settings/update';
import { schema } from 'const/validateSchema/Prices';
import { signal } from 'const/';

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
 @media (max-width: 600px) {
  margin: 5px auto;
  input {
   width: 70px;
  }
  label {
   width: 250px;
  }
 }
`;

const Prices = () => {
 const dispatch = useDispatch();
 const prices = useSelector(state => state.prices.globalPrices);
 const [isEdit, setIsEdit] = useState(false);

 return (
  <div>
   <Formik
    validationSchema={schema}
    // ONSUBMIT REQUEST
    onSubmit={async values => {
     const updatePrices = {
      manHour: values.manHour,
      gloss: {
       oneSide: values.glossOneSide,
       bothSides: values.glossBothSides,
       oneGlossSecondSemigloss: values.glossOneGlossSecondSemigloss,
      },
      semiGloss: {
       oneSide: values.semiGlossOneSide,
       bothSides: values.semiGlossBothSides,
      },
      customerMaterial: {
       gloss: {
        oneSide: values.customerGlossOneSide,
        bothSides: values.customerGlossBothSides,
        oneGlossSecondSemigloss: values.customerGlossOneGlossSecondSemigloss,
       },
       semiGloss: {
        oneSide: values.customerSemiGlossOneSide,
        bothSides: values.customerSemiGlossBothSides,
        mordant: values.customerMordant,
        veneerColorless: values.customerVeneerColorless,
       },
       milledElement: values.customerMilledElement,
       milledElementBothSides: values.customerMilledElementBothSides,
      },
      board: {
       '22': values.board22,
       '25': values.board25,
       '28': values.board28,
       '30': values.board30,
       '38': values.board38,
      },
      milledHandle: values.milledHandle,
      chamfering: values.chamfering,
      backMilling: values.backMilling,
      milledPartHandle: values.milledPartHandle,
      millingHandle: values.millingHandle,
      paintHandle: values.paintHandle,
      zobalHandle: values.zobalHandle,
      hingeHole: values.hingeHole,
      milledElement: values.milledElement,
      milledElementBothSides: values.milledElementBothSides,
     };
     dispatch(setSpinner(true));
     await updateGlobalPrices(updatePrices, () => {
      dispatch(loadPrices(() => dispatch(setSpinner(false)), signal.token));
     });
    }}
    initialValues={{
     manHour: prices.manHour,
     glossOneSide: prices.gloss.oneSide,
     glossBothSides: prices.gloss.bothSides,
     glossOneGlossSecondSemigloss: prices.gloss.oneGlossSecondSemigloss,

     semiGlossOneSide: prices.semiGloss.oneSide,
     semiGlossBothSides: prices.semiGloss.bothSides,

     customerGlossOneSide: prices.customerMaterial.gloss.oneSide,
     customerGlossBothSides: prices.customerMaterial.gloss.bothSides,
     customerGlossOneGlossSecondSemigloss:
      prices.customerMaterial.gloss.oneGlossSecondSemigloss,

     customerSemiGlossOneSide: prices.customerMaterial.semiGloss.oneSide,
     customerSemiGlossBothSides: prices.customerMaterial.semiGloss.bothSides,

     customerMordant: prices.customerMaterial.semiGloss.mordant,
     customerVeneerColorless: prices.customerMaterial.semiGloss.veneerColorless,

     customerMilledElement: prices.customerMaterial.milledElement,
     customerMilledElementBothSides:
      prices.customerMaterial.milledElementBothSides,

     board22: prices.board[22],
     board25: prices.board[25],
     board28: prices.board[28],
     board30: prices.board[30],
     board38: prices.board[38],

     chamfering: prices.chamfering,
     backMilling: prices.backMilling,
     milledElement: prices.milledElement,
     milledElementBothSides: prices.milledElementBothSides,
     milledHandle: prices.milledHandle,
     milledPartHandle: prices.milledPartHandle,
     millingHandle: prices.millingHandle,
     paintHandle: prices.paintHandle,
     zobalHandle: prices.zobalHandle,
     hingeHole: prices.hingeHole,
    }}
    render={({
     handleSubmit,
     handleChange,
     handleBlur,
     values,
     touched,
     errors,
    }) => {
     return (
      <Form noValidate onSubmit={handleSubmit}>
       <Row justify="flex-start">
        <div>
         <Heading>Materiał Blow</Heading>
         <Row justify="flex-start">
          <div>
           <StyledH6>Połysk:</StyledH6>
           <StyledWrapper className="greyOnHover" controlId="formOneSideGloss">
            <Form.Label>
             Gładki - Jednostronny <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="glossOneSide"
             value={values.glossOneSide}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.glossOneSide && !errors.glossOneSide}
             placeholder="-"
             className={
              errors.glossOneSide && touched.glossOneSide && 'is-invalid'
             }
            />
            {errors.glossOneSide && touched.glossOneSide && (
             <div className="invalid">{errors.glossOneSide}</div>
            )}
           </StyledWrapper>
           <StyledWrapper
            className="greyOnHover"
            controlId="formBothSidesGloss"
           >
            {' '}
            <Form.Label>
             Gładki - Dwustronny <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="glossBothSides"
             value={values.glossBothSides}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.glossBothSides && !errors.glossBothSides}
             placeholder="-"
             className={
              errors.glossBothSides && touched.glossBothSides && 'is-invalid'
             }
            />
            {errors.glossBothSides && touched.glossBothSides && (
             <div className="invalid">{errors.glossBothSides}</div>
            )}
           </StyledWrapper>
           <StyledWrapper
            className="greyOnHover"
            controlId="formOneGlossSecondSemigloss"
           >
            {' '}
            <Form.Label>
             Gładki - P.połysk / L.półmat <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="glossOneGlossSecondSemigloss"
             value={values.glossOneGlossSecondSemigloss}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={
              touched.glossOneGlossSecondSemigloss &&
              !errors.glossOneGlossSecondSemigloss
             }
             placeholder="-"
             className={
              errors.glossOneGlossSecondSemigloss &&
              touched.glossOneGlossSecondSemigloss &&
              'is-invalid'
             }
            />
            {errors.glossOneGlossSecondSemigloss &&
             touched.glossOneGlossSecondSemigloss && (
              <div className="invalid">
               {errors.glossOneGlossSecondSemigloss}
              </div>
             )}
           </StyledWrapper>
           <StyledH6>Półmat/Mat:</StyledH6>
           <StyledWrapper
            className="greyOnHover"
            controlId="formOneSideSemigloss"
           >
            <Form.Label>
             Gładki - Jednostronny <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="semiGlossOneSide"
             value={values.semiGlossOneSide}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.semiGlossOneSide && !errors.semiGlossOneSide}
             placeholder="-"
             className={
              errors.semiGlossOneSide &&
              touched.semiGlossOneSide &&
              'is-invalid'
             }
            />
            {errors.semiGlossOneSide && touched.semiGlossOneSide && (
             <div className="invalid">{errors.semiGlossOneSide}</div>
            )}
           </StyledWrapper>
           <StyledWrapper
            className="greyOnHover"
            controlId="formBothSidesSemigloss"
           >
            <Form.Label>
             Gładki - Dwustronny <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="semiGlossBothSides"
             value={values.semiGlossBothSides}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.semiGlossBothSides && !errors.semiGlossBothSides}
             placeholder="-"
             className={
              errors.semiGlossBothSides &&
              touched.semiGlossBothSides &&
              'is-invalid'
             }
            />
            {errors.semiGlossBothSides && touched.semiGlossBothSides && (
             <div className="invalid">{errors.semiGlossBothSides}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formMilledElement">
            <Form.Label>
             CNC - Jednostronny <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="milledElement"
             value={values.milledElement}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.milledElement && !errors.milledElement}
             placeholder="-"
             className={
              errors.milledElement && touched.milledElement && 'is-invalid'
             }
            />
            {errors.milledElement && touched.milledElement && (
             <div className="invalid">{errors.milledElement}</div>
            )}
           </StyledWrapper>
           <StyledWrapper
            className="greyOnHover"
            controlId="formMilledElementBothSides"
           >
            <Form.Label>
             CNC - Dwustronny<small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="milledElementBothSides"
             value={values.milledElementBothSides}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={
              touched.milledElementBothSides && !errors.milledElementBothSides
             }
             placeholder="-"
             className={
              errors.milledElementBothSides &&
              touched.milledElementBothSides &&
              'is-invalid'
             }
            />
            {errors.milledElementBothSides &&
             touched.milledElementBothSides && (
              <div className="invalid">{errors.milledElementBothSides}</div>
             )}
           </StyledWrapper>
          </div>
          <div>
           <StyledH6>Obróbka elementów:</StyledH6>
           <StyledWrapper className="greyOnHover" controlId="formMilledHandle">
            {' '}
            <Form.Label>
             Uchwyt frez + lak <small>[m.b.]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="milledHandle"
             value={values.milledHandle}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.milledHandle && !errors.milledHandle}
             placeholder="-"
             className={
              errors.milledHandle && touched.milledHandle && 'is-invalid'
             }
            />
            {errors.milledHandle && touched.milledHandle && (
             <div className="invalid">{errors.milledHandle}</div>
            )}
           </StyledWrapper>
           <StyledWrapper
            className="greyOnHover"
            controlId="formMilledPartHandle"
           >
            {' '}
            <Form.Label>
             Uchwyt frez. częściowy + lak <small>[m.b.]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="milledPartHandle"
             value={values.milledPartHandle}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.milledPartHandle && !errors.milledPartHandle}
             placeholder="-"
             className={
              errors.milledPartHandle &&
              touched.milledPartHandle &&
              'is-invalid'
             }
            />
            {errors.milledPartHandle && touched.milledPartHandle && (
             <div className="invalid">{errors.milledPartHandle}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formMillingHandle">
            {' '}
            <Form.Label>
             Frezowanie uchwytu <small>[m.b.]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="millingHandle"
             value={values.millingHandle}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.millingHandle && !errors.millingHandle}
             placeholder="-"
             className={
              errors.millingHandle && touched.millingHandle && 'is-invalid'
             }
            />
            {errors.millingHandle && touched.millingHandle && (
             <div className="invalid">{errors.millingHandle}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formZobalHandle">
            {' '}
            <Form.Label>
             Uchwyt zobal <small>[m.b.]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="zobalHandle"
             value={values.zobalHandle}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.zobalHandle && !errors.zobalHandle}
             placeholder="-"
             className={
              errors.zobalHandle && touched.zobalHandle && 'is-invalid'
             }
            />
            {errors.zobalHandle && touched.zobalHandle && (
             <div className="invalid">{errors.zobalHandle}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formHingeHole">
            <Form.Label>
             Otw. pod zawiasy <small>[szt.]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="hingeHole"
             value={values.hingeHole}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.hingeHole && !errors.hingeHole}
             placeholder="-"
             className={errors.hingeHole && touched.hingeHole && 'is-invalid'}
            />
            {errors.hingeHole && touched.hingeHole && (
             <div className="invalid">{errors.hingeHole}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formChamfering">
            <Form.Label>
             Gierowanie <small>[m.b.]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="chamfering"
             value={values.chamfering}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.chamfering && !errors.chamfering}
             placeholder="-"
             className={errors.chamfering && touched.chamfering && 'is-invalid'}
            />
            {errors.chamfering && touched.chamfering && (
             <div className="invalid">{errors.chamfering}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formBackMilling">
            <Form.Label>
             Frezowanie pod plecy <small>[m.b]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="backMilling"
             value={values.backMilling}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.backMilling && !errors.backMilling}
             placeholder="-"
             className={
              errors.backMilling && touched.backMilling && 'is-invalid'
             }
            />
            {errors.backMilling && touched.backMilling && (
             <div className="invalid">{errors.backMilling}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formManHout">
            <Form.Label>
             Roboczogodziny <small>[zł/h]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="manHour"
             value={values.manHour}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.manHour && !errors.manHour}
             placeholder="-"
             className={errors.manHour && touched.manHour && 'is-invalid'}
            />
            {errors.manHour && touched.manHour && (
             <div className="invalid">{errors.manHour}</div>
            )}
           </StyledWrapper>

           <StyledH6>Elementy pogdubiane:</StyledH6>
           <StyledWrapper className="greyOnHover" controlId="formBoard22">
            <Form.Label>
             22mm <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="board22"
             value={values.board22}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.board22 && !errors.board22}
             placeholder="-"
             className={errors.board22 && touched.board22 && 'is-invalid'}
            />
            {errors.board22 && touched.board22 && (
             <div className="invalid">{errors.board22}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formBoard25">
            <Form.Label>
             25mm <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="board25"
             value={values.board25}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.board25 && !errors.board25}
             placeholder="-"
             className={errors.board25 && touched.board25 && 'is-invalid'}
            />
            {errors.board25 && touched.board25 && (
             <div className="invalid">{errors.board25}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formBoard28">
            <Form.Label>
             28mm <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="board28"
             value={values.board28}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.board28 && !errors.board28}
             placeholder="-"
             className={errors.board28 && touched.board28 && 'is-invalid'}
            />
            {errors.board28 && touched.board28 && (
             <div className="invalid">{errors.board28}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formBoard30">
            <Form.Label>
             30mm <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="board30"
             value={values.board30}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.board30 && !errors.board30}
             placeholder="-"
             className={errors.board25 && touched.board30 && 'is-invalid'}
            />
            {errors.board30 && touched.board30 && (
             <div className="invalid">{errors.board30}</div>
            )}
           </StyledWrapper>
           <StyledWrapper className="greyOnHover" controlId="formBoard38">
            <Form.Label>
             38mm <small>[m2]</small>:
            </Form.Label>
            <Form.Control
             required
             disabled={!isEdit}
             type="text"
             name="board38"
             value={values.board38}
             onChange={handleChange}
             onBlur={handleBlur}
             isValid={touched.board38 && !errors.board38}
             placeholder="-"
             className={errors.board38 && touched.board38 && 'is-invalid'}
            />
            {errors.board38 && touched.board38 && (
             <div className="invalid">{errors.board38}</div>
            )}
           </StyledWrapper>
          </div>
         </Row>
        </div>
        {/**
    |--------------------------------------------------
    | CUSTOMER MATERIAL
    |--------------------------------------------------
    */}
        <div>
         <Heading>Materiał powierzony</Heading>
         <StyledH6>Połysk:</StyledH6>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerOneSideGloss"
         >
          <Form.Label>
           Gładki - Jednostronny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerGlossOneSide"
           value={values.customerGlossOneSide}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerGlossOneSide && !errors.customerGlossOneSide
           }
           placeholder="-"
           className={
            errors.customerGlossOneSide &&
            touched.customerGlossOneSide &&
            'is-invalid'
           }
          />
          {errors.customerGlossOneSide && touched.customerGlossOneSide && (
           <div className="invalid">{errors.customerGlossOneSide}</div>
          )}
         </StyledWrapper>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerBothSidesGloss"
         >
          <Form.Label>
           Gładki - Dwustronny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerGlossBothSides"
           value={values.customerGlossBothSides}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerGlossBothSides && !errors.customerGlossBothSides
           }
           placeholder="-"
           className={
            errors.customerGlossBothSides &&
            touched.customerGlossBothSides &&
            'is-invalid'
           }
          />
          {errors.customerGlossBothSides && touched.customerGlossBothSides && (
           <div className="invalid">{errors.customerGlossBothSides}</div>
          )}
         </StyledWrapper>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerGlossOneGlossSecondSemigloss"
         >
          {' '}
          <Form.Label>
           Gładki - P.połysk / L.półmat <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerGlossOneGlossSecondSemigloss"
           value={values.customerGlossOneGlossSecondSemigloss}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerGlossOneGlossSecondSemigloss &&
            !errors.customerGlossOneGlossSecondSemigloss
           }
           placeholder="-"
           className={
            errors.customerGlossOneGlossSecondSemigloss &&
            touched.customerGlossOneGlossSecondSemigloss &&
            'is-invalid'
           }
          />
          {errors.customerGlossOneGlossSecondSemigloss &&
           touched.customerGlossOneGlossSecondSemigloss && (
            <div className="invalid">
             {errors.customerGlossOneGlossSecondSemigloss}
            </div>
           )}
         </StyledWrapper>

         <StyledH6>Półmat/Mat:</StyledH6>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerOneSideSemigloss"
         >
          <Form.Label>
           Gładki - Jednostronny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerSemiGlossOneSide"
           value={values.customerSemiGlossOneSide}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerSemiGlossOneSide && !errors.customerSemiGlossOneSide
           }
           placeholder="-"
           className={
            errors.customerSemiGlossOneSide &&
            touched.customerSemiGlossOneSide &&
            'is-invalid'
           }
          />
          {errors.customerSemiGlossOneSide &&
           touched.customerSemiGlossOneSide && (
            <div className="invalid">{errors.customerSemiGlossOneSide}</div>
           )}
         </StyledWrapper>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerBothSidesSemigloss"
         >
          <Form.Label>
           Gładki - Dwustronny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerSemiGlossBothSides"
           value={values.customerSemiGlossBothSides}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerSemiGlossBothSides &&
            !errors.customerSemiGlossBothSides
           }
           placeholder="-"
           className={
            errors.customerSemiGlossBothSides &&
            touched.customerSemiGlossBothSides &&
            'is-invalid'
           }
          />
          {errors.customerSemiGlossBothSides &&
           touched.customerSemiGlossBothSides && (
            <div className="invalid">{errors.customerSemiGlossBothSides}</div>
           )}
         </StyledWrapper>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerMilledElement"
         >
          <Form.Label>
           CNC - Jednostronny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerMilledElement"
           value={values.customerMilledElement}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerMilledElement && !errors.customerMilledElement
           }
           placeholder="-"
           className={
            errors.customerMilledElement &&
            touched.customerMilledElement &&
            'is-invalid'
           }
          />
          {errors.customerMilledElement && touched.customerMilledElement && (
           <div className="invalid">{errors.customerMilledElement}</div>
          )}
         </StyledWrapper>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerMilledElementBothSides"
         >
          <Form.Label>
           CNC - Dwustronny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerMilledElementBothSides"
           value={values.customerMilledElementBothSides}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerMilledElementBothSides &&
            !errors.customerMilledElementBothSides
           }
           placeholder="-"
           className={
            errors.customerMilledElementBothSides &&
            touched.customerMilledElementBothSides &&
            'is-invalid'
           }
          />
          {errors.customerMilledElementBothSides &&
           touched.customerMilledElementBothSides && (
            <div className="invalid">
             {errors.customerMilledElementBothSides}
            </div>
           )}
         </StyledWrapper>
         <StyledWrapper className="greyOnHover" controlId="formCustomerMordant">
          <Form.Label>
           Fornir - Bejca + Bezbarwny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerMordant"
           value={values.customerMordant}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.customerMordant && !errors.customerMordant}
           placeholder="-"
           className={
            errors.customerMordant && touched.customerMordant && 'is-invalid'
           }
          />
          {errors.customerMordant && touched.customerMordant && (
           <div className="invalid">{errors.customerMordant}</div>
          )}
         </StyledWrapper>
         <StyledWrapper
          className="greyOnHover"
          controlId="formCustomerVeneerColorless"
         >
          <Form.Label>
           Fornir - Bezbarwny <small>[m2]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="customerVeneerColorless"
           value={values.customerVeneerColorless}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={
            touched.customerVeneerColorless && !errors.customerVeneerColorless
           }
           placeholder="-"
           className={
            errors.customerVeneerColorless &&
            touched.customerVeneerColorless &&
            'is-invalid'
           }
          />
          {errors.customerVeneerColorless &&
           touched.customerVeneerColorless && (
            <div className="invalid">{errors.customerVeneerColorless}</div>
           )}
         </StyledWrapper>
         <StyledWrapper className="greyOnHover" controlId="formPaintHandle">
          {' '}
          <Form.Label>
           Lakierowanie uchwytu<small> [m.b.]</small>:
          </Form.Label>
          <Form.Control
           required
           disabled={!isEdit}
           type="text"
           name="paintHandle"
           value={values.paintHandle}
           onChange={handleChange}
           onBlur={handleBlur}
           isValid={touched.paintHandle && !errors.paintHandle}
           placeholder="-"
           className={errors.paintHandle && touched.paintHandle && 'is-invalid'}
          />
          {errors.paintHandle && touched.paintHandle && (
           <div className="invalid">{errors.paintHandle}</div>
          )}
         </StyledWrapper>
         {/* BUTTONS */}
         <Row justify="flex-end">
          <Button variant="success" type="submit" disabled={!isEdit}>
           Zatwierdź
          </Button>
          <Button
           variant={isEdit ? 'outline-secondary' : 'secondary'}
           onClick={() => setIsEdit(!isEdit)}
          >
           {isEdit ? 'Zablokuj edycję' : 'Edytuj'}
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

// Prices.propTypes = {};

export default Prices;
