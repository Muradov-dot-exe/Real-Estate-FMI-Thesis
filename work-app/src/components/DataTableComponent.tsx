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

export default function DataTableComponent() {
  const [data, setData] = useState<Specs[]>([]);

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
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Motherboard Brand</TableCell>
            <TableCell align="inherit">&nbsp;RAM(GB)</TableCell>
            <TableCell align="inherit">Video Card&nbsp;</TableCell>
            <TableCell align="inherit">Carbs&nbsp;(g)</TableCell>
            <TableCell align="inherit">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Specs) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
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
