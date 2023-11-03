import { Box, Divider, Typography } from "@mui/material";
import DataTableComponent from "../components/DataTableComponent";
import { useContext, useEffect } from "react";
import { TitleContext } from "../context/context";

const Airplanes = () => {
  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Aircraft");
  }, [value]);

  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
          display: "flex",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          PC Components and Specs
        </Typography>
      </Box>
      <Divider />
      <Box>
        <DataTableComponent />
      </Box>
    </>
  );
};

export default Airplanes;
