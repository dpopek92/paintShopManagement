import * as yup from 'yup';

export const schema = yup.object({
 firstname: yup
  .string()
  .required('Imię jest wymagane')
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, 'Nieprawidłowe format'),
 company: yup.string().required('Nazwa firmy jest wymagana'),
 email: yup
  .string()
  .email('Format adresu email jest nieprawidłowy')
  .required('Email jest wymagany'),
 password: yup
  .string()
  .min(6, 'Hasło musi składać się z min. 6 znaków')
  .required('Hasło jest wymagane'),
 password2: yup
  .string()
  .min(6, 'Hasło musi składać się z min. 6 znaków')
  .required('Potwierdzenie hasła jest wymagane'),
 rodo: yup
  .bool()
  .oneOf([true], 'Zgoda jest wymagana')
  .required('Zgoda jest wymagana'),
 reg: yup
  .bool()
  .oneOf([true], 'Zgoda jest wymagana')
  .required('Zgoda jest wymagana'),
 msg: yup
  .bool()
  .oneOf([true], 'Zgoda jest wymagana')
  .required('Zgoda jest wymagana'),
});
