import * as Styled from "./styles"
import { MdClose } from "react-icons/md"
import { Button } from "@mui/material"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const ModalLogout = ({ setIsLogout }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        toast.success("You are logged out")
        setIsLogout(false)
        setTimeout(() => {
            return navigate("/login")
        }, 1500)
    }

    return (
        <Styled.Container>
            <div>
                <Styled.HeaderModal>
                    Logout
                    <MdClose size="20px"/>
                </Styled.HeaderModal>
                <hr/>
                <Styled.BodyModal>
                    <span>Are you sure about that?</span>
                    <div>
                        <Button variant="contained" onClick={() => setIsLogout(false)}>No</Button>
                        <Button variant="outlined" onClick={handleLogout}>Yes</Button>
                    </div>
                </Styled.BodyModal>
            </div>
        </Styled.Container>
    )
}