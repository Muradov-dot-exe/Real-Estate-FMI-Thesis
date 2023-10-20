import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppSidebar from "../navbars/AppSidebar";
import CustomizedSnackbars from "../components/notificationPopup";

const Layout = () => {
  return (
    <>
      <AppSidebar />
      <CustomizedSnackbars />

      <Box sx={{ position: "relative", backgroundColor: "beige" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
