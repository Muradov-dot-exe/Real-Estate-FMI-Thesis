import { Alert, AlertTitle, Box } from "@mui/material";
import React from "react";
const PleaseLogin = () => {
  return (
    <Box>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a highly watched and sought after estate company ! In order to
        view any of our available properties and different collection of premium
        items and goods — <strong>please sing in or sign up!</strong>
      </Alert>
    </Box>
  );
};
export default PleaseLogin;
