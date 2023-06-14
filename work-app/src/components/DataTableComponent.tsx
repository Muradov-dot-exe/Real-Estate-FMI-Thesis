import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Specs } from "../types/specTypes";
import AutoComplete from "./AutoCompleteComponent";
import axios from "axios";
import { Button } from "@mui/material";

export default function DataTableComponent() {
  const [data, setData] = useState<Specs[]>([]);
  const [motherboard, setMotherboard] = useState("");

  const fetchJson = async () => {
    await axios
      .get("http://localhost:3001/specs")
      .then((response) => {
        setData(response.data);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    fetchJson();
  }, []);

  const handleMotherboard = (event: any) => {
    setMotherboard(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Motherboard Brand</TableCell>
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
              <TableCell component="th" scope="row">
                <Button
                  value={row.name}
                  color="primary"
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
                {/* <AutoComplete Data={row.carbs} /> */}
              </TableCell>
              <TableCell align="center">
                {/* <AutoComplete Data={row.protein} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
