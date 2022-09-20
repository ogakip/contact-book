import { object, string } from "yup";

export const createUserSchema = object().shape({
    name: string().required("Name is required on body request").max(158, "Length must be under 158"),
    email: string()
      .email("E-mail format invalid")
      .required("E-mail is required on body request")
      .max(158, "Length must be under 158"),
    password: string()
    .required("Password is required on body request")
    .matches(/[a-z]/, "Your password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Your password must contain at least one capital letter")
      .matches(/[0-9]/, "Your password must contain at least one number")
      .matches(/\W/, "Your password must contain at least one special character")
      .matches(/^(?!.*\s).{0,}$/, "Your password cannot contain spaces")
}).noUnknown(true)

export const loginUserSchema = object().shape({
  email: string()
      .email("E-mail format invalid")
      .required("E-mail is required on body request"),
  password: string()
  .required("Password is required on body request")
}).noUnknown(true)