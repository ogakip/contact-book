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
import { createClientSchema } from "../../validations/createClient";
import { yupResolver } from "@hookform/resolvers/yup";

export const ClientForm = ({ setClientModal, setFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createClientSchema)
  });

  const onSubmitForm = (data) => {
    setFormData(data)
  };

  useEffect(() => {
    const { name, email, telephone } = errors;
    const allErrors = [name, email, telephone];
    const filterErrors = allErrors.filter((error) => error !== undefined);
    filterErrors.map((error) => toast.error(`${error.message}`));
  }, [errors]);

  return (
    <Styled.Container>
      <div>
        <Styled.HeaderModal>
          Client form
          <MdClose size="20px" onClick={() => setClientModal(false)} />
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
            <Button type="submit" variant="contained">Create Client</Button>
          </div>
        </Styled.BodyModal>
      </div>
    </Styled.Container>
  );
};
