import * as Styled from "./styles";
import { MdClose } from "react-icons/md";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AiOutlineUser,
  AiOutlineMail
} from "react-icons/ai";
import { BsTelephone } from "react-icons/bs"

export const ClientFormEdit = ({ setClientEdit, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitForm = (data) => {
    setFormData(data)
  };

  return (
    <Styled.Container>
      <div>
        <Styled.HeaderModal>
          Edit client
          <MdClose size="20px" onClick={() => setClientEdit(false)} />
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
            {...register("telephone")}
            placeholder="(xx)xxxxx-xxxx"
            label="Telephone"
            InputProps={{
              startAdornment: (
                <BsTelephone size="20px" className="form-icon" />
              ),
            }}
          />
          <div className="btn-box">
            <Button type="submit" variant="contained">Edit</Button>
          </div>
        </Styled.BodyModal>
      </div>
    </Styled.Container>
  );
};
