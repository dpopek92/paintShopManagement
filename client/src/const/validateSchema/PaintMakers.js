import * as yup from "yup";

export const schema = yup.object({
 paintGloss: yup.string().required("wymagane"),
 paintSemigloss: yup.string().required("wymagane"),
 paintBase: yup.string().required("wymagane")
});
