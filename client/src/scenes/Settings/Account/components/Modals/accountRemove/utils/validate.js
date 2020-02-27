/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 password: yup.string().required('Hasło jest wymagane'),
});
