import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Box id="error-page">
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h3" marginTop={"100px"}>
          Oops! You just got 404-ed. GGWP!
        </Typography>
        <Typography marginTop={"20px"}>
          Sorry, but you are digging too much. This page doesn't exist nigga
        </Typography>
        <Typography marginTop={"30px"}>
          Got to<Link to={"/"}> Home</Link>.
        </Typography>
      </Container>
    </Box>
  );
}
