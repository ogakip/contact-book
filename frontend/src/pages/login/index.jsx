import * as Styled from "./styles";
import { FormContainer } from "../../components/formLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export const Login = () => {
  const getToken = localStorage.getItem("accessToken");
  let navigate = useNavigate();
  const [formData, setFormData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getToken) {
      navigate("/dashboard");
    }
  }, [getToken]);

  const sendLoginRequest = async () => {
    await api
      .post("user/login", formData)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken)
        toast.success("You are logged in")
      })
      .catch((error) => toast.error(`${error.response.data.error}`));
    setIsLoading(false);
  };

  useEffect(() => {
    if (formData) {
      setIsLoading(true);
      sendLoginRequest();
    }
  }, [formData]);

  return (
    <Styled.Container>
      {isLoading && <Loading />}
      <FormContainer setFormData={setFormData} />
    </Styled.Container>
  );
};
