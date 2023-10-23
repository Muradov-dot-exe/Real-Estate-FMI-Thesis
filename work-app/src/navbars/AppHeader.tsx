import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/authActions";
import { TitleContext } from "../context/context";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import AppSidebar from "./AppSidebar";

const AppHeader = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const dispatch = useDispatch();

  const value = useContext(TitleContext);

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
      notif();
    }
  };

  const notif = () => {
    toast.info("Signed Out");
  };

  const defaultTheme = createTheme();

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <AppSidebar isOpen={isDrawerOpen} onClose={handleDrawerClose} />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: "#aa6c39" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>

              <Typography sx={{ marginLeft: "10px" }}>{value.title}</Typography>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {currentUser !== null && currentUser.displayName && (
                  <Typography align="center">
                    Hello, {currentUser.displayName}
                  </Typography>
                )}
              </Typography>

              {!currentUser ? (
                <>
                  <Button color="inherit" href="/signup">
                    Sign Up
                  </Button>
                  <Button color="inherit" href="/signin">
                    Sign In
                  </Button>
                </>
              ) : (
                <Button onClick={handleAuth} color="inherit" href="/">
                  Sign Out
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default AppHeader;
