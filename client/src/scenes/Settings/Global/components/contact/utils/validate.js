/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 companyName: yup.string().required('Nazwa jest wymagana'),
 NIP: yup
  .string()
  .length(9, 'NIP musi składać się z 9 cyfr')
  .matches(/^[0-9]*$/, 'Tylko cyfry')
  .required('NIP jest wymagany'),
 REGON: yup
  .string()
  .matches(/^[0-9]*$/, 'Tylko cyfry')
  .max(9, 'REGON musi składać się z max 9 cyfr')
  .required('REGON jest wymagany'),
});
