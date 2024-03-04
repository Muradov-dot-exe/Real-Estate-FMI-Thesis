import React, { useContext, useEffect } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import { TitleContext } from "../context/context";

import Slider from "../components/Image Slider/Slider";
import PleaseLogin from "./pleaseLogin";
import SearchBar from "../components/SearchBar";
import { useUserAuth } from "../context/authContext";

export default function Home() {
  const defaultTheme = createTheme();
  const { user } = useUserAuth();

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
          <Slider aircraft={false} vehicles={false} />
        </Box>
      </Grid>

      <Box
        sx={{
          marginTop: 4,
        }}
      >
        {user ? (
          <SearchBar aircraft={false} vehicles={false} />
        ) : (
          <PleaseLogin />
        )}
      </Box>
    </ThemeProvider>
  );
}
