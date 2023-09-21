import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { TitleContext, requestSender } from "../context/context";
import { Box, Divider, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../src/locations/mapContainer.css";
import ModalComponent from "../modals/modalPopUp";
import { Department } from "../types/departmentTypes";
import axios from "axios";
import DeleteModal from "../modals/deleteModal";const LocationPages = () => {
  const value = useContext(TitleContext);
  const [department, setDepartment] = useState<Department[]>([]);
  const contextData = useContext(requestSender);
  const [deleteId, setDeleteId] = useState<number>();
  const onRowsSelectionHandler = (ids: any) => {
    const selectedRowsData = ids.map((id: any) =>
      department.find((row: any) => row.id === id)
    );
    const idNumber = selectedRowsData.map((item: any) => item.id);
    setDeleteId(idNumber);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 0,
      renderCell: (params) => {
        return params.row.id;
      },
      sortable: false,
      editable: false,
    },
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
      width: 100,
      renderCell: () => {
        return (
          <>
            <IconButton>
              <EditIcon />
            </IconButton>
            <DeleteModal deleteId={deleteId} />
          </>
        );
      },
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
  }, [contextData.dataValue]);

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
          disableColumnMenu
          rows={department}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          onRowSelectionModelChange={(ids: any) => onRowsSelectionHandler(ids)}
        />
      </Box>
    </>
  );
};

export default LocationPages;
