import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  IconButton,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/authActions";
import { TitleContext } from "../context/context";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import AppSidebar from "./AppSidebar";
import styledlineimage from "../img/styledlineimage.jpg";

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
          <AppBar position="fixed" style={{ backgroundColor: "#aa6c39" }}>
            <Toolbar>
              <IconButton
                sx={{ color: "black" }}
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                sx={{ marginLeft: "10px", color: "black" }}
                fontFamily={"Times New Roman"}
                fontSize={"large"}
              >
                {value.title}
              </Typography>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {currentUser !== null && currentUser.displayName && (
                  <Grid container justifyContent="center">
                    <Grid
                      item
                      xs={2}
                      sm={6}
                      md={2}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      {" "}
                      <Box
                        component="img"
                        src={styledlineimage}
                        alt="wavy line"
                        sx={{ width: "70%", marginRight: 4 }}
                      />
                      <Typography
                        align="center"
                        fontFamily={"Times New Roman"}
                        fontSize={"large"}
                        color="black"
                      >
                        Welcome, {currentUser.displayName}
                      </Typography>
                      <Box
                        component="img"
                        src={styledlineimage}
                        alt="wavy line"
                        sx={{ width: "70%", marginLeft: 4 }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Typography>

              {!currentUser ? (
                <>
                  <Button color="inherit" href="/signup">
                    <Typography fontFamily={"Times New Roman"} color="black">
                      Sign Up
                    </Typography>
                  </Button>
                  <Button color="inherit" href="/signin">
                    <Typography fontFamily={"Times New Roman"} color="black">
                      Sign In
                    </Typography>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleAuth}
                  color="inherit"
                  href="/"
                  sx={{ width: "8%", marginLeft: 6 }}
                >
                  <Typography fontFamily={"Times New Roman"} color="black">
                    Sign Out
                  </Typography>
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
