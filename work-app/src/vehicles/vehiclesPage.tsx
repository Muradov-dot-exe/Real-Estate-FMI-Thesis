import React, { useContext, useEffect } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import { TitleContext } from "../context/context";

import Slider from "../components/Image Slider/Slider";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import PleaseLogin from "../pages/pleaseLogin";

export default function LuxuryVehicles() {
  const defaultTheme = createTheme();
  const { currentUser } = useSelector((state: any) => state.user);

  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Luxury Vehicles");
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
          <Slider aircraft={false} vehicles={true} />
        </Box>
      </Grid>

      <Box
        sx={{
          marginTop: 4,
        }}
      >
        {currentUser ? (
          <SearchBar aircraft={false} vehicles={true} />
        ) : (
          <PleaseLogin />
        )}
      </Box>
    </ThemeProvider>
  );
}
