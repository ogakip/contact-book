import * as yup from "yup"

export const createClientSchema = yup.object().shape({
    name: yup.string().required("Name is required on body request").max(158, "Length must be under 158"),
    email: yup.string()
      .email("E-mail format invalid")
      .required("E-mail is required on body request")
      .max(158, "Length must be under 158"),
    telephone: yup.string()
      .required("Telephone is required on body request")
      .matches(/^\([1-9]{2}\)[9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$/, "Invalid cellphone number")
}).noUnknown(true)