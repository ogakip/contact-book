import * as Styled from "./styles";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = ({ data, columns }) => {
  return (
    <Styled.Container>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        pageSize={10}
      />
    </Styled.Container>
  );
};
