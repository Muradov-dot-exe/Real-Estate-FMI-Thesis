import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { TitleContext } from "../context/context";
import { Box, Divider, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../src/locations/mapContainer.css";
import ModalComponent from "../modals/modalPopUp";
import { Department } from "../types/departmentTypes";
import axios from "axios";

const LocationPages = () => {
  const value = useContext(TitleContext);
  const [department, setDepartment] = useState<Department[]>([]);

  const columns: GridColDef[] = [
    {
      field: "locationName",
      headerName: "Location",
      width: 600,
      renderCell: (params) => {
        return params.row.locationName;
      },
      sortable: false,
    },
    {
      field: "organizationName",
      headerName: "Organization",
      width: 650,
      renderCell: (params) => {
        return params.row.organizationName;
      },
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
    {
      id: "0",
      organizationName: department.map((item: Department) => {
        return item.organizationName;
      }),
      locationName: department.map((item: Department) => {
        return item.locationName[0];
      }),
    },
    {
      id: "1",
      organizationName: department.map((item: Department) => {
        return item.organizationName;
      }),
      locationName: department.map((item: Department) => {
        return item.locationName[1];
      }),
    },
  ];
  useEffect(() => {
    value.setTitle("Locations");
  }, [value]);

  const getDepartment = async () => {
    await axios
      .get("http://localhost:3001/department")
      .then((response) => {
        setDepartment(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getDepartment();
  }, []);

  console.log(department);

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
            <ModalComponent />
            <Divider
              sx={{
                width: 1533,
                marginTop: -3,
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
          rows={department}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </>
  );
};

export default LocationPages;
