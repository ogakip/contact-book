import * as Styled from "./styles";
import { MdClose } from "react-icons/md";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineKey,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";

export const ModalEditUser = ({ setEditUser, setFormData, handleLogout }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = (data) => {
    let isEmpty = true
    let dataWithoutEmptyValues = {}
    for (const key in data) {
        if (data[key].length > 0) {
            isEmpty = false
            dataWithoutEmptyValues[`${key}`] = data[key]
        }
    }
    if (isEmpty) {
        setFormData({})
    } else {
        setFormData(dataWithoutEmptyValues);
    }
    reset();
  };

  return (
    <Styled.Container>
      <div>
        <Styled.HeaderModal>
          Edit user
          <MdClose size="20px" />
        </Styled.HeaderModal>
        <Styled.BodyModal onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            {...register("name")}
            placeholder="Name"
            label="Name"
            InputProps={{
              startAdornment: (
                <AiOutlineUser size="20px" className="form-icon" />
              ),
            }}
          />
          <TextField
            {...register("email")}
            placeholder="E-mail"
            label="E-mail"
            InputProps={{
              startAdornment: (
                <AiOutlineMail size="20px" className="form-icon" />
              ),
            }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            label="Password"
            InputProps={{
              startAdornment: (
                <AiOutlineKey size="20px" className="form-icon" />
              ),
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
            <Button type="submit" variant="contained">Edit</Button>
            <Button onClick={handleLogout}>Delete account</Button>
          </div>
        </Styled.BodyModal>
      </div>
    </Styled.Container>
  );
};
