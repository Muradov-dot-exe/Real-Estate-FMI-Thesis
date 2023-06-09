import { Outlet } from "react-router-dom";
import HomeBar from "../navbars/AppHeader";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <HomeBar />

      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
