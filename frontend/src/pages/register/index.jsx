import { FormContainer } from "../../components/formRegister";
import * as Styled from "./styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { Loading } from "../../components/loading";

export const Register = () => {
  const getToken = localStorage.getItem("accessToken");
  let navigate = useNavigate();
  const [formData, setFormData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getToken) {
      return navigate("/dashboard");
    }
  }, [getToken]);

  const sentRegisterRequest = async () => {
    setIsLoading(true);
    await api.post("user/register", formData)
    setIsLoading(false);
  };

  useEffect(() => {
    if (formData) {
      sentRegisterRequest();
    }
  }, [formData]);

  return (
    <Styled.Container>
      {isLoading && <Loading />}
      <FormContainer setFormData={setFormData} />
    </Styled.Container>
  );
};
