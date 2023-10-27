import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { TitleContext } from "../context/context";
import { Box, Divider, MenuItem, Select, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AutoComplete from "../components/AutoCompleteComponent";

const columns: GridColDef[] = [
  { field: "Location", headerName: "Location", width: 600, sortable: false },
  {
    field: "Organization",
    headerName: "Organization",
    width: 650,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    editable: false,
    renderCell: () => {
      return (
        <IconButton>
          <EditIcon />
        </IconButton>
      );
    },
  },
];

const rows = [
  { id: "0", Organization: "Robert Bosch EOOD", Location: "Sf" },
  { id: "1", Organization: "Robert Bosch EOOD", Location: "Sf4" },
];

const DepartmentsPage = () => {
  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Departments");
  }, [value]);

  return (
    <>
      <Box
        style={{
          height: 10,
          width: "80%",
          display: "flex",
          marginLeft: 350,
          marginTop: 170,
        }}
      >
        <Box sx={{ marginTop: -8, marginRight: -10 }}>
          <Typography sx={{ fontWeight: "bold" }}>Departments</Typography>
          <Box sx={{ width: 500 }}>
            <Divider
              sx={{
                fontSize: "50px",
                width: 1533,
                fontWeight: "bold",
                padding: "13px",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          height: 50,
          width: "80%",
          display: "flex",
          marginLeft: 350,
        }}
      >
        <AutoComplete Data={[""]} componentWidth={1000} />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          sx={{ marginLeft: 20, width: 500, height: 54, marginTop: -0.1 }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>
      <Box
        style={{
          height: 700,
          width: "80%",
          display: "flex",
          marginLeft: 350,
          marginTop: 10,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu={true}
          disableColumnSelector={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[]}
        />
      </Box>
    </>
  );
};
export default DepartmentsPage;
