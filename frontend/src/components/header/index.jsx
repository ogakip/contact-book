import * as Styled from "./styles";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrContactInfo } from "react-icons/gr";
import { useState } from "react";
import { ModalUser } from "../modalUser";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Styled.Container>
      <h1>
        <span>C</span>ontactBook
        <GrContactInfo />
      </h1>
      <div onClick={handleModal}>
        <GiHamburgerMenu size="30px"/>
        {openModal && <ModalUser/>}
      </div>
    </Styled.Container>
  );
};
