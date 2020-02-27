/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 password: yup.string().required('Hasło jest wymagane'),
 newPassword: yup
  .string()
  .min(6, 'Hasło musi składać się z min. 6 znaków')
  .required('Hasło jest wymagane'),
 newPassword2: yup
  .string()
  .min(6, 'Hasło musi składać się z min. 6 znaków')
  .required('Hasło jest wymagane'),
});
