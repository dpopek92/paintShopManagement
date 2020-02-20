import * as yup from "yup";

export const schema = yup.object({
 firstname: yup
  .string()
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, "Nieprawidłowy format")
  .required("Imię jest wymagane"),
 surname: yup
  .string()
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, "Nieprawidłowy format"),
 email: yup
  .string()
  .email("Format adresu email jest nieprawidłowy")
  .required("Adres e-mail jest wymagany")
});
