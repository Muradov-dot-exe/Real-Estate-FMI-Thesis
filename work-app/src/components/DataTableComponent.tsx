import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Prices, Specs } from "../types/specTypes";
import AutoComplete from "./AutoCompleteComponent";
import axios from "axios";
import { Button } from "@mui/material";

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

  console.log(getAllPrices);

  const handleMotherboard = (event: any) => {
    setMotherboard(event.target.value);
  };

  useEffect(() => {
    if (motherboard === "MSI MOTHERBOARD") {
      setPriceAdder(200);
    }
  }, [motherboard]);

  const datarest = data.map((item) => ({ ...item }));

  console.log(datarest);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Motherboard Brand</TableCell>
            <TableCell align="inherit">&nbsp;RAM(GB)</TableCell>
            <TableCell align="inherit">Video Card&nbsp;</TableCell>
            <TableCell align="inherit">VRAM&nbsp;(GB)</TableCell>
            <TableCell align="inherit">Price&nbsp;(USD$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Specs) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right">
                <Button
                  value={row.name}
                  color="primary"
                  disabled={motherboard !== ""}
                  onClick={(e) => {
                    handleMotherboard(e);
                  }}
                >
                  {row.name}
                </Button>
              </TableCell>
              <TableCell align="left">
                <AutoComplete Data={row.RAM} />
              </TableCell>
              <TableCell align="center">
                <AutoComplete Data={row.VideoCard} />
              </TableCell>
              <TableCell align="center">
                <AutoComplete Data={row.VRAM} />
              </TableCell>
              <TableCell align="center">{priceAdder}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
