import * as yup from "yup";

export const schema = yup.object({
 password: yup
  .string()
  .required("Hasło jest wymagane")
  .min(6, "Hasło musi zawierać min. 6 znaków"),
 password2: yup
  .string()
  .required("Hasło jest wymagane")
  .min(6, "Hasło musi zawierać min. 6 znaków")
});
