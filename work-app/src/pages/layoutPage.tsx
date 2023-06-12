import { Outlet } from "react-router-dom";
import AppHeader from "../navbars/AppHeader";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <AppHeader />

      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
