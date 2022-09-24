import * as Styled from "./styles";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validations/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  AiOutlineMail,
  AiOutlineKey,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export const FormContainer = ({ setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = (data) => {
    setFormData(data);
    reset();
  };

  const resetForm = () => {
    reset();
  };

  useEffect(() => {
    const { email, password } = errors;
    const allErrors = [ email, password ];
    const filterErrors = allErrors.filter((error) => error !== undefined);
    filterErrors.map((error) => toast.error(`${error.message}`));
  }, [errors]);

  return (
    <Styled.Container>
      <h2>Login form</h2>
      <Styled.InputContainer onSubmit={handleSubmit(onSubmitForm)}>
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
        <span>Não tem uma conta? <Link to="/register">Registre-se</Link></span>
        <div className="btn-box">
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button onClick={resetForm} variant="outlined">
            Limpar
          </Button>
        </div>
      </Styled.InputContainer>
    </Styled.Container>
  );
};
