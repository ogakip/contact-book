import * as Styled from "./styles";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../validations/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineKey,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";

export const FormContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = (data) => {
    console.log(data);
    setFormData(JSON.stringify(data));
    reset();
  };

  const resetForm = () => {
    reset();
  };

  useEffect(() => {
    const { name, email, password, confirmPassword, bio, contact } = errors;
    const allErrors = [name, email, password, confirmPassword, bio, contact];
    const filterErrors = allErrors.filter((error) => error !== undefined);
    filterErrors.map((error) => toast.error(`${error.message}`));
  }, [errors]);

  return (
    <Styled.Container>
      <h2>Formulário de registro</h2>
      <Styled.InputContainer onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          {...register("name")}
          placeholder="Nome"
          label="Nome"
          InputProps={{
            startAdornment: <AiOutlineUser size="20px" className="form-icon" />,
          }}
        />
        <TextField
          {...register("email")}
          placeholder="E-mail"
          label="E-mail"
          InputProps={{
            startAdornment: <AiOutlineMail size="20px" className="form-icon" />,
          }}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Senha"
          label="Senha"
          InputProps={{
            startAdornment: <AiOutlineKey size="20px" className="form-icon" />,
            endAdornment: (
              <>
                {showPassword ? (
                  <AiFillEye
                    className="eye-icon"
                    size="25px"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="eye-icon"
                    size="25px"
                    onClick={handleShowPassword}
                  />
                )}
              </>
            ),
          }}
        />
        <div className="btn-box">
          <Button type="submit" variant="contained">
            Registrar
          </Button>
          <Button onClick={resetForm} variant="outlined">
            Limpar
          </Button>
        </div>
      </Styled.InputContainer>
    </Styled.Container>
  );
};
