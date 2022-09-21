import { object, string } from "yup";

export const createClientSchema = object().shape({
    name: string().required("Name is required on body request").max(158, "Length must be under 158"),
    email: string()
      .email("E-mail format invalid")
      .required("E-mail is required on body request")
      .max(158, "Length must be under 158"),
    telephone: string()
      .required("Telephone is required on body request")
      .matches(/^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/, "Invalid cellphone number")
}).noUnknown(true)