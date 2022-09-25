import * as Styled from "./styles";
import { MdClose } from "react-icons/md";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export const DeleteContactModal = ({ currentContactId, setContactDelete, getClientContacts }) => {
  const getToken = localStorage.getItem("accessToken");

  const handleDelete = () => {
    api
      .delete(`contacts/${currentContactId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        toast.success("Contact deleted with success")
        getClientContacts()
      })
      .catch((error) => toast.error(error.response.data.error));
      setContactDelete(false)
  };

  return (
    <Styled.Container>
      <div>
        <Styled.HeaderModal>
          Deleting contact
          <MdClose size="20px" />
        </Styled.HeaderModal>
        <hr />
        <Styled.BodyModal>
          <span>Are you sure about that?</span>
          <div>
            <Button variant="contained" onClick={() => setContactDelete(false)}>
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
