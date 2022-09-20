import { object, string } from "yup";

export const createUserSchema = object().shape({
    name: string().required("Name is required on body request").max(158, "Length must be under 158"),
    email: string()
      .email("E-mail format invalid")
      .required("E-mail is required on body request")
      .max(158, "Length must be under 158"),
    password: string()
    .required("Password is required on body request")
    .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
    "Password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character"
    )
})