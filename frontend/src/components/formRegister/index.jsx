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
import { Link } from "react-router-dom";

export const FormContainer = ({ setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
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
    const { name, email, password } = errors;
    const allErrors = [name, email, password];
    const filterErrors = allErrors.filter((error) => error !== undefined);
    filterErrors.map((error) => toast.error(`${error.message}`));
  }, [errors]);

  return (
    <Styled.Container>
      <h2>Register form</h2>
      <Styled.InputContainer onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          {...register("name")}
          placeholder="Name"
          label="Name"
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
          placeholder="Password"
          label="Password"
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
        <span>Already have an account? <Link to="/login">Login</Link></span>
        <div className="btn-box">
          <Button type="submit" variant="contained">
            Register
          </Button>
          <Button onClick={resetForm} variant="outlined">
            Clear form
          </Button>
        </div>
      </Styled.InputContainer>
    </Styled.Container>
  );
};
