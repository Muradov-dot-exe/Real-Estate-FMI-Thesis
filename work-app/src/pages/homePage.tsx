import React, { useContext, useEffect } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import { TitleContext } from "../context/context";

import Slider from "../components/Image Slider/Slider";
import DisplayCards from "../components/DisplayCards";

export default function Home() {
  const defaultTheme = createTheme();

  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Home");
  }, [value]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container sx={{ display: "flex" }}>
        <Box
          sx={{
            height: "10%",
            width: "100%",
          }}
        >
          <Slider />
        </Box>
      </Grid>

      <Box
        sx={{
          marginTop: 8,
          flexDirection: "column",
          alignItems: "center",
          display: "flex",
        }}
      >
        <DisplayCards />
      </Box>
    </ThemeProvider>
  );
}
