import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const [redirect, setRedirect] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirect((currentCount) => --currentCount);
    }, 1000);

    redirect === 0 && navigate("/signin");

    return () => clearInterval(interval);
  }, [redirect, navigate]);

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h3" marginTop={"50px"}>
          Restricted access redirecting
        </Typography>
      </Container>
    </Box>
  );
};

export default RedirectPage;
