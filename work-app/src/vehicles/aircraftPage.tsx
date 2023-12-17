import React, { useContext, useEffect } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import { TitleContext } from "../context/context";

import Slider from "../components/Image Slider/Slider";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import PleaseLogin from "../pages/pleaseLogin";

export default function Home() {
  const defaultTheme = createTheme();
  const { currentUser } = useSelector((state: any) => state.user);

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
          marginTop: 4,
        }}
      >
        {currentUser ? <SearchBar /> : <PleaseLogin />}
      </Box>
    </ThemeProvider>
  );
}
