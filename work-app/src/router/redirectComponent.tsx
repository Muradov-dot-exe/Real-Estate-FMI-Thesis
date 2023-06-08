import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const [redirect, setRedirect] = useState(0);
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
      <Grid item xs>
        <Typography> YOU HAVE TO LOGIN TO VIEW PAGE!!!</Typography>
      </Grid>

      <Typography>Redirecting you to Sign In page in {redirect}</Typography>
    </Box>
  );
};

export default RedirectPage;
