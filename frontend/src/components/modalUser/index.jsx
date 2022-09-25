import * as Styled from "./styles"
import { GoTriangleUp } from "react-icons/go"

export const ModalUser = () => {
    return (
        <Styled.Container>
            <GoTriangleUp color="#999999" size="20px" className="triangle"/>
            <Styled.ModalBox>
                <div>Edit user</div>
                <hr/>
                <div className="logout">Logout</div>
            </Styled.ModalBox>
        </Styled.Container>
    )
}