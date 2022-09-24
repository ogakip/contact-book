import { FormContainer } from "../../components/formRegister";
import * as Styled from "./styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api"
import { Loading } from "../../components/loading";

export const Register = () => {
  const getToken = localStorage.getItem("accessToken");
  let navigate = useNavigate();
  const [formData, setFormData] = useState(undefined);

  useEffect(() => {
    if (getToken) {
      return navigate("/dashboard");
    }
  }, [getToken]);

  useEffect(() => {
    if (formData) {
        toast.success("chegou")
        console.log(formData)
    }
  }, [formData])

  return (
    <Styled.Container>
      <Loading/>
      <FormContainer setFormData={setFormData}/>
    </Styled.Container>
  );
};
