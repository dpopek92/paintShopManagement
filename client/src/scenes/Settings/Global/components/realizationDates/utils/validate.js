/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const schema = yup.object({
 gloss: yup.number().required('Wartość wymagana'),
 semiGloss: yup.number().required('Wartość wymagana'),
 milling: yup.number().required('Wartość wymagana'),
 veneer: yup.number().required('Wartość wymagana'),
});
