import React, { useContext, useEffect, useRef } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import { TitleContext } from "../context/context";

import Slider from "../components/Image Slider/Slider";
import { useSelector } from "react-redux";
import PleaseLogin from "./pleaseLogin";
import SearchBar from "../components/SearchBar";
import AppFooter from "../navbars/AppFooter";

export default function Home() {
  const defaultTheme = createTheme();
  const { currentUser } = useSelector((state: any) => state.user);

  const value = useContext(TitleContext);
  console.log(currentUser);

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
