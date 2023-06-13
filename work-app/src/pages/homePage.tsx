import React, { useContext, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { TitleContext } from "../context/context";
import TitlebarImageList from "../helpers/imageList";

export default function Home() {
  const defaultTheme = createTheme();

  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Home");
  }, [value]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth={false} disableGutters>
        <Box
          component="img"
          sx={{
            height: 300,
            maxHeight: { xs: 300, md: 340 },
            width: "100%",
          }}
          alt="The house from the offer."
          src="https://pra.com/wp-content/uploads/2018/09/State_Office-Page-PNG-3-Images-Long-Image-1300x300.png"
        />
      </Container>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Available Products
          </Typography>
          <Divider />
          <TitlebarImageList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
