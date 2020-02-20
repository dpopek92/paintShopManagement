/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 glossOneSide: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 glossBothSides: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 glossOneGlossSecondSemigloss: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 semiGlossOneSide: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 semiGlossBothSides: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 customerGlossOneSide: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 customerGlossBothSides: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 customerGlossOneGlossSecondSemigloss: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 customerSemiGlossOneSide: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 customerSemiGlossBothSides: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 customerMordant: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 customerVeneerColorless: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 customerMilledElement: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 customerMilledElementBothSides: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 board22: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 board25: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 board28: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 board30: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 board38: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),

 chamfering: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 backMilling: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 milledElement: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 milledElementBothSides: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 milledHandle: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 milledPartHandle: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 millingHandle: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 paintHandle: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 zobalHandle: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
 hingeHole: yup
  .number()
  .typeError('wartość musi być liczbą')
  .positive('wartość nie może być ujemna')
  .required('wymagane'),
});
