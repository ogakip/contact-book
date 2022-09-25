import * as Styled from "./styles";
import { DataTable } from "../../components/dataTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Header } from "../../components/header";
import { Button, TextField } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai"

export const Dashboard = () => {
  const getToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [clientData, setClientData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [filterSearch, setFilterSearch] = useState("")

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

  const handleClick = (event, cellValues) => {
    console.log(cellValues.id)
  }

  useEffect(() => {
    getClientData();
  }, []);

  const columns = [
    { field: "id", headerName: 'ID', flex: 1 },
    { field: "name", headerName: 'Name', flex: 1 },
    { field: "email", headerName: 'E-mail', flex: 1 },
    { field: "telephone", headerName: 'Telephone', flex: 1 },
    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Details
          </Button>
        );
      }
    }
  ]

  return (
    <Styled.Container>
      <Header />
      <Styled.DataContainer>
        <div>
            <div className="table-header">
              <div className="filter-box">
                Customer list
                <TextField placeholder="Filter search" label="Filter search" onChange={(event) => setFilterSearch(event.target.value)}/>
                <Button variant="outlined" onClick={() => setFilterSearch("")}>Clear filter</Button>
              </div>
              <Button variant="contained">Add Client</Button>
            </div>
            {filterSearch?.length === 0 ? (
              <DataTable data={clientData && clientData} columns={columns}/>
            ) : (
              <DataTable data={filteredData} columns={columns}/>
            )}
        </div>
      </Styled.DataContainer>
    </Styled.Container>
  );
};
