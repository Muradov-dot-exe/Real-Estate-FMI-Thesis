import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { Prices, Specs } from "../types/specTypes";
import AutoComplete from "./AutoCompleteComponent";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

export default function DataTableComponent() {
  const [data, setData] = useState<Specs[]>([]);
  const [price, setPrice] = useState<Prices[]>([]);
  const [motherboard, setMotherboard] = useState("");
  const [priceAdder, setPriceAdder] = useState<number>(0);

  const getAllSpecs = async () => {
    await axios
      .get("http://localhost:3001/specs")
      .then((response) => {
        setData(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };
  const getAllPrices = async () => {
    await axios
      .get("http://localhost:3001/prices")
      .then((response) => {
        setPrice(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getAllSpecs();
    getAllPrices();
  }, []);

  const handleMotherboard = (event: any) => {
    setMotherboard(event.target.value);
  };
  const normalPrice = price.map((price: Prices) => {
    return price.ramPrice.filter((item) => {
      return item === 200;
    });
  });
  useEffect(() => {
    if (motherboard === "MSI MOTHERBOARD") {
      setPriceAdder(200);
    }
  }, [motherboard]);
  const priceCalc = () => {};

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", sortable: false, width: 90 },
    {
      field: "motherboard",
      headerName: "Motherboard",
      renderCell: (params) => {
        return <AutoComplete Data={params.row.motherboard} />;
      },
      sortable: false,
      width: 200,
      minWidth: 200,
    },
    {
      field: "RAM",
      headerName: "RAM(GB)",
      width: 200,
      sortable: false,

      renderCell: (params) => {
        return <AutoComplete Data={params.row.RAM} />;
      },
    },
    {
      field: "VideoCard",
      headerName: "VideoCard",
      renderCell: (params) => {
        return <AutoComplete Data={params.row.VideoCard} />;
      },
      width: 200,
      sortable: false,

      minWidth: 100,
    },
    {
      field: "VRAM",
      headerName: "VRAM(GB)",
      renderCell: (params) => {
        return <AutoComplete Data={params.row.VRAM} />;
      },
      width: 200,
      sortable: false,

      minWidth: 100,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        getRowHeight={() => 70}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 1,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
