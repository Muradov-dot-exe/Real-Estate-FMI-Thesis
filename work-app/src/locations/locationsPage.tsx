import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { TitleContext } from "../context/context";
import { Box, Button, Divider, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../src/locations/mapContainer.css";

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

const LocationPages = () => {
  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Locations");
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
          <Typography sx={{ fontWeight: "bold" }}>Locations</Typography>
          <Box sx={{ width: 500 }}>
            <Divider
              sx={{
                height: "10px",
                fontSize: "50px",
                width: 1533,
                fontWeight: "bold",
                padding: "15px",
              }}
            />
          </Box>
        </Box>
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

export default LocationPages;
