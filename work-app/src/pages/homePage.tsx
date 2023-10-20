import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TitleContext } from "../context/context";
import DeleteFile from "../components/delete";
import newLogo from "../img/newRealEstateLogo.jpg";
import Slider from "../components/Image Slider/Slider";

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
            marginLeft: "9%",
            marginTop: "2%",
          }}
        >
          <Slider />
        </Box>
      </Grid>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            flexDirection: "column",
            alignItems: "center",
            display: "flex",
          }}
        >
          inline
          <DeleteFile />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
