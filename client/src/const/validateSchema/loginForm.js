import * as yup from "yup";

export const schema = yup.object({
 email: yup.string().required("Email jest wymagany"),
 password: yup.string().required("Hasło jest wymagane")
});
