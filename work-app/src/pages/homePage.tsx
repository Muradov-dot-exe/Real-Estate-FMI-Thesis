import React, { useContext, useEffect } from "react";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import { TitleContext } from "../context/context";

export default function Home() {
  const defaultTheme = createTheme();

  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Home");
  }, [value]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth={false} disableGutters sx={{ display: "flex" }}>
        <Box
          component="img"
          sx={{
            height: 300,
            maxHeight: { xs: 300, md: 340 },
            width: "auto",
            marginLeft: 50,
          }}
          alt="The house from the offer."
          src="https://pra.com/wp-content/uploads/2018/09/State_Office-Page-PNG-3-Images-Long-Image-1300x300.png"
        />
      </Container>

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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
