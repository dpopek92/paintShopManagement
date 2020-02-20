import * as yup from "yup";

export const schema = yup.object({
 firstname: yup
  .string()
  .required("Imię jest wymagane")
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, "Nieprawidłowy format"),
 surname: yup
  .string()
  .required("Nazwisko jest wymagane")
  .matches(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/, "Nieprawidłowy format"),
 email: yup
  .string()
  .email("Format adresu email jest nieprawidłowy")
  .required("Email jest wymagany"),
 password: yup
  .string()
  .min(6, "Hasło musi składać się z min. 6 znaków")
  .required("Hasło jest wymagane"),
 password2: yup
  .string()
  .min(6, "Hasło musi składać się z min. 6 znaków")
  .required("Potwierdzenie hasła jest wymagane"),

 rodo: yup.bool().oneOf([true], "Zgoda jest wymagana"),
 reg: yup.bool().oneOf([true], "Zgoda jest wymagana")
});
