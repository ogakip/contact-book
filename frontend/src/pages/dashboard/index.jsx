import * as Styled from "./styles";
import { DataTable } from "../../components/dataTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Header } from "../../components/header";
import { Button, TextField } from "@mui/material";
import { ClientForm } from "../../components/clientForm";
import { toast } from "react-toastify";
import { ClientDetails } from "../../components/clientDetails";
import { ClientFormEdit } from "../../components/clientEdit";

export const Dashboard = () => {
  const getToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [clientData, setClientData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");
  const [clientModal, setClientModal] = useState(false);
  const [formData, setFormData] = useState(undefined);
  const [editClientFormData, setEditClientFormData] = useState(undefined)
  const [clientDetails, setClientDetails] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [clientEdit, setClientEdit] = useState(false)
  const [clientDelete, setClientDelete] = useState(false)

  useEffect(() => {
    if (!getToken) {
      return navigate("/login");
    }
  }, [getToken]);

  const getClientData = async () => {
    const res = await api.get("/clients/", {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    console.log(res.data);
    setClientData(res.data);
  };

  const filterData = () => {
    if (clientData) {
      const filtered = clientData.filter((client) => {
        const { name, email, telephone } = client;

        if (name.includes(filterSearch)) {
          return client;
        } else if (email.includes(filterSearch)) {
          return client;
        } else if (telephone.includes(filterSearch)) {
          return client;
        }
      });

      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [filterSearch]);

  const handleContact = (event, cellValues) => {
    setCurrentId(cellValues.id);
    setClientDetails(true);
  };

  const handleEdit = (event, cellValues) => {
    setCurrentId(cellValues.id);
    setClientEdit(true);
  }

  const handleDelete = (event, cellValues) => {
    setCurrentId(cellValues.id);
    setClientDelete(true);
  }

  useEffect(() => {
    getClientData();
  }, []);

  useEffect(() => {
    if (formData) {
      api
        .post("/clients/", formData, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          toast.success("Client created with success");
          getClientData();
          setClientModal(false);
        })
        .catch((error) => {
          toast.success(error.response.data.error);
        });
    }
  }, [formData]);

  useEffect(() => {
    if (editClientFormData) {
      api.patch(`clients/${currentId}`, editClientFormData, {
        headers: {
          "Authorization": `Bearer ${getToken}`
        }
      }).then((res) => {
        toast.success("Client edited with success")
        getClientData();
        setClientEdit(false);
      }).catch((error) => toast.error(error.response.data.error))
    }
  }, [editClientFormData])

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "telephone", headerName: "Telephone", flex: 1 },
    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleContact(event, cellValues);
              }}
            >
              Contacts
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleEdit(event, cellValues);
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => {
                handleDelete(event, cellValues);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
      flex: 1,
    },
  ];

  return (
    <Styled.Container>
      {clientDetails && (
        <ClientDetails
          currentId={currentId}
          setClientDetails={setClientDetails}
        />
      )}
      {clientModal && (
        <ClientForm setFormData={setFormData} setClientModal={setClientModal} />
      )}
      {clientEdit && <ClientFormEdit setFormData={setEditClientFormData} setClientEdit={setClientEdit}/>}
      <Header />
      <Styled.DataContainer>
        <div>
          <div className="table-header">
            <div className="filter-box">
              Customer list
              <TextField
                placeholder="Filter search"
                label="Filter search"
                onChange={(event) => setFilterSearch(event.target.value)}
              />
              <Button variant="outlined" onClick={() => setFilterSearch("")}>
                Clear filter
              </Button>
            </div>
            <Button onClick={() => setClientModal(true)} variant="contained">
              Add Client
            </Button>
          </div>
          {filterSearch?.length === 0 ? (
            <DataTable data={clientData && clientData} columns={columns} />
          ) : (
            <DataTable data={filteredData} columns={columns} />
          )}
        </div>
      </Styled.DataContainer>
    </Styled.Container>
  );
};
