import * as Styled from "./styles";
import { MdClose } from "react-icons/md";
import { DataTable } from "../dataTable";
import { api } from "../../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

export const ClientDetails = ({ currentId, setClientDetails }) => {
  const getToken = localStorage.getItem("accessToken");
  const [clientContacts, setClientContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [contactModal, setContactModal] = useState(false);

  const getClientContacts = () => {
    api
      .get(`contacts/${currentId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        setClientContacts(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const filterData = () => {
    if (clientContacts) {
      const filtered = clientContacts.filter((client) => {
        const { name, email, telephone } = client

        if (name.includes(filterSearch)) {
          return client
        } else if (email.includes(filterSearch)) {
          return client
        } else if (telephone.includes(filterSearch)) {
          return client
        }
      })
      
      setFilteredData(filtered)
    }
  }

  useEffect(() => {
    filterData()
  }, [filterSearch])

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "telephone", headerName: "Telephone", flex: 1 },
  ];

  useEffect(() => {
    getClientContacts();
  }, []);

  return (
    <Styled.Container>
      <Styled.DataContainer>
        <div>
          <div className="table-header">
            <div className="filter-box">
              Contact list
              <TextField
                placeholder="Filter search"
                label="Filter search"
                onChange={(event) => setFilterSearch(event.target.value)}
              />
              <Button variant="outlined" onClick={() => setFilterSearch("")}>
                Clear filter
              </Button>
            </div>
            <div className="close-box">
              <Button onClick={() => setContactModal(true)} variant="contained">
                Add Contact
              </Button>
              <MdClose size="20px" onClick={() => setClientDetails(false)} />
            </div>
          </div>
          {filterSearch?.length === 0 ? (
            <DataTable
              data={clientContacts && clientContacts}
              columns={columns}
            />
          ) : (
            <DataTable data={filteredData} columns={columns} />
          )}
        </div>
      </Styled.DataContainer>
    </Styled.Container>
  );
};
