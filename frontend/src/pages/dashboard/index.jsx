import * as Styled from "./styles"
import { DataTable } from "../../components/dataTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

export const Dashboard = () => {
    const getToken = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const [clientData, setClientData] = useState([])

    useEffect(() => {
        if (!getToken) {
            return navigate("/login")
        }
    }, [getToken])

    const getClientData = async () => {
        const res = await api.get("/clients/", {
            headers: {
                "Authorization": `Bearer ${getToken}`
            }
        })
        console.log(res.data)
        setClientData(res.data)
    }

    useEffect(() => {
        getClientData()
    }, [])

    const tableColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone'
        }
    ]


    return (
        <Styled.Container>
            <Styled.DataContainer>
                <DataTable data={clientData} columns={tableColumns}/>
            </Styled.DataContainer>
        </Styled.Container>
    )
}