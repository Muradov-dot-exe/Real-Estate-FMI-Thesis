import React from "react";
import HomeBar from "../navbars/AppBar";
import { Box, Container, Paper, Stack } from "@mui/material";

export default function Home() {
  return (
    <>
      <HomeBar />
      <p></p>
      <Container maxWidth={false} disableGutters>
        <Box
          component="img"
          sx={{
            height: 300,
            maxHeight: { xs: 300, md: 340 },
            width: "100%",
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
      </Container>
      <p></p>
      <Box component="div" sx={{ display: "inline" }}>
        inline
      </Box>
      <Box component="div" sx={{ display: "inline" }}>
        inline
      </Box>
    </>
  );
}
