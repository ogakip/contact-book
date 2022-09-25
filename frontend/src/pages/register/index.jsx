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

  const sentRegisterRequest = () => {
    api
      .post("user/register", formData)
      .then((res) => {
        toast.success("Account created with success!");
        setTimeout(() => {
          return navigate("/login");
        }, 1500);
      })
      .catch((error) => toast.error(`${error.response.data.error}`));
    setIsLoading(false);
  };

  useEffect(() => {
    if (formData) {
      setIsLoading(true);
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
