/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 name: yup
  .string()
  .max(15, 'Max 15 znaków')
  .required('Nazwa jest wymagana'),
 postcode: yup
  .string()
  .matches(/^\d{2}-\d{3}$/, 'Nieprawidłowy format')
  .required('Kod pocztowy jest wymagany'),
 city: yup.string().required('Miejscowość jest wymagana'),
 street: yup.string().required('Ulica jest wymagana'),
 description: yup.string().max(60, 'Max 60 znaków'),
});
