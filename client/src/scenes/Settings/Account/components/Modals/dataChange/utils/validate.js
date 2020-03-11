/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 firstname: yup
  .string()
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, 'Nieprawidłowy format')
  .required('Imię jest wymagane'),
 surname: yup
  .string()
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, 'Nieprawidłowy format'),
 email: yup
  .string()
  .email('Format adresu email jest nieprawidłowy')
  .required('Adres e-mail jest wymagany'),
 company: yup.string().required('Nazwa firmy jest wymagana'),
 postcode: yup.string().matches(/^\d{2}-\d{3}$/, 'Nieprawidłowy format'),
 street: yup.string(),
 city: yup.string(),
 NIP: yup.string().matches(/^[0-9_.-\s]*$/, 'Nieprawidłowy format'),
 phone: yup.string().matches(/^[0-9_.-\s]*$/, 'Nieprawidłowy format'),
});
