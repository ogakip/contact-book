import * as Styled from "./styles";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrContactInfo } from "react-icons/gr";
import { useEffect, useState } from "react";
import { ModalUser } from "../modalUser";
import { ModalLogout } from "../modalLogout";
import { ModalEditUser } from "../modalEditUser";
import { api } from "../../services/api"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const [isLogout, setIsLogout] = useState(false)
  const [isEditUser, setEditUser] = useState(false)
  const [formData, setFormData] = useState(undefined)
  const getToken = localStorage.getItem("accessToken")

  const handleModal = (state) => {
    setOpenModal(!state);
  };

  const updateUserRequest = async () => {
    api.patch("user/", formData, {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    }).then((res) => {
      toast.success("User updated with success")
    }).catch((error) => {
      toast.error(error.response.data.error)
    })
    setFormData(undefined)
  }

  const deleteUserRequest = () => {
    api.delete("user/", {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    }).then((res) => {
      localStorage.removeItem("accessToken")
      navigate("/login")
    }).catch((error) => toast.error(error.response.data.error))
  }

  useEffect(() => {
    if (formData) {
      updateUserRequest()
      console.log(formData)
    }
  }, [formData])

  return (
    <Styled.Container>
      {isLogout && <ModalLogout setIsLogout={setIsLogout}/>}
      {isEditUser && <ModalEditUser handleDelete={deleteUserRequest} setFormData={setFormData} setEditUser={setEditUser}/>}
      <h1>
        <span>C</span>ontactBook
        <GrContactInfo />
      </h1>
      <div onClick={() => handleModal(openModal)}>
        <GiHamburgerMenu size="30px"/>
        {openModal && <ModalUser setEditUser={setEditUser} setIsLogout={setIsLogout}/>}
      </div>
    </Styled.Container>
  );
};
