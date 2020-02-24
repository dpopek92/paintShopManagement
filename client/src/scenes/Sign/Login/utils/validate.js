import * as yup from 'yup';

export const schema = yup.object({
 email: yup
  .string()
  .email('Format adresu email jest nieprawidłowy')
  .required('Email jest wymagany'),
 password: yup.string().required('Hasło jest wymagane'),
});
