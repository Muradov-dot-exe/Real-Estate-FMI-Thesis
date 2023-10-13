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
          component="img"
          sx={{
            height: "100%",
            width: "100%",
          }}
          alt="The house from the offer."
          src="https://pra.com/wp-content/uploads/2018/09/State_Office-Page-PNG-3-Images-Long-Image-1300x300.png"
        />
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
