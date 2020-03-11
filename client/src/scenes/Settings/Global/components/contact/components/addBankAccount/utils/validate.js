/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 name: yup
  .string()
  .max(15, 'Max 15 znaków')
  .required('Nazwa jest wymagana'),
 bankName: yup
  .string()
  .max(15, 'Max 15 znaków')
  .required('Kod pocztowy jest wymagany'),
 accountNumber: yup
  .string()
  .length(26, 'Numer konta musi zawierać 26 cyfr')
  .matches(/^[0-9]*$/, 'Nieprawidłowy format')
  .required('Miejscowość jest wymagana'),
});
