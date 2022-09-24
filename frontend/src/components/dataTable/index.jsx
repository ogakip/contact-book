import * as Styled from "./styles"
import { Table } from "antd"

export const DataTable = ({ data = [], columns = [] }) => {
    return (
        <Styled.Container>
            <Table dataSource={data} columns={columns}/>
        </Styled.Container>
    )
}