import * as Styled from "./styles";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrContactInfo } from "react-icons/gr";
import { useState } from "react";
import { ModalUser } from "../modalUser";
import { ModalLogout } from "../modalLogout";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLogout, setIsLogout] = useState(false)

  const handleModal = (state) => {
    setOpenModal(!state);
  };

  return (
    <Styled.Container>
      {isLogout && <ModalLogout setIsLogout={setIsLogout}/>}
      <h1>
        <span>C</span>ontactBook
        <GrContactInfo />
      </h1>
      <div onClick={() => handleModal(openModal)}>
        <GiHamburgerMenu size="30px"/>
        {openModal && <ModalUser setIsLogout={setIsLogout}/>}
      </div>
    </Styled.Container>
  );
};
