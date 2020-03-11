/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 name: yup
  .string()
  .max(15, 'Max 15 znaków')
  .required('Nazwa jest wymagana'),
 number: yup
  .string()
  .max(10, 'Max 9 znaków')
  .matches(/^[0-9-\s]*$/, 'Nieprawidłowy format')
  .required('Numer jest wymagany'),
});
