import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import AppSidebar from "../navbars/AppSidebar";

const Layout = () => {
  return (
    <>
      <AppSidebar />

      <Box sx={{ position: "relative" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
