import * as Styled from "./styles";
import { MdClose } from "react-icons/md";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const DeleteClientModal = ({ setClientDelete, currentId, getClientData }) => {
  const getToken = localStorage.getItem("accessToken");

  const handleDelete = () => {
    api
      .delete(`clients/${currentId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        toast.success("Client deleted with success")
        getClientData()
      })
      .catch((error) => toast.error(error.response.data.error));
      setClientDelete(false)
  };

  return (
    <Styled.Container>
      <div>
        <Styled.HeaderModal>
          Deleting customer
          <MdClose size="20px" />
        </Styled.HeaderModal>
        <hr />
        <Styled.BodyModal>
          <span>Are you sure about that?</span>
          <div>
            <Button variant="contained" onClick={() => setClientDelete(false)}>
              No
            </Button>
            <Button variant="outlined" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Styled.BodyModal>
      </div>
    </Styled.Container>
  );
};
