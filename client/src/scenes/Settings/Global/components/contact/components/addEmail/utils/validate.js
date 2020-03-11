/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 name: yup
  .string()
  .max(15, 'Max 15 znaków')
  .required('Nazwa jest wymagana'),
 email: yup
  .string()
  .email('Nieprawidłowy format')
  .required('Adres e-mail jest wymagana'),
});
