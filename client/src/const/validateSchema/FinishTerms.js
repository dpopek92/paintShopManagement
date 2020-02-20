import * as yup from "yup";

export const schema = yup.object({
 dateVeneer: yup
  .number()
  .typeError("wartość musi być liczbą")
  .positive("wartość nie może być ujemna")
  .required("wymagane"),
 dateMilling: yup
  .number()
  .typeError("wartość musi być liczbą")
  .positive("wartość nie może być ujemna")
  .required("wymagane"),
 dateGloss: yup
  .number()
  .typeError("wartość musi być liczbą")
  .positive("wartość nie może być ujemna")
  .required("wymagane"),
 dateSemigloss: yup
  .number()
  .typeError("wartość musi być liczbą")
  .positive("wartość nie może być ujemna")
  .required("wymagane")
});
