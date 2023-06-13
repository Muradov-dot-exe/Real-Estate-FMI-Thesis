import { Box, Divider, Typography } from "@mui/material";
import DataTableComponent from "../components/DataTableComponent";
import { useContext, useEffect } from "react";
import { TitleContext } from "../context/context";

const ProductsPages = () => {
  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Products");
  }, [value]);

  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Food Macros</Typography>
      </Box>
      <Divider />
      <Box>
        <DataTableComponent />
      </Box>
    </>
  );
};

export default ProductsPages;
