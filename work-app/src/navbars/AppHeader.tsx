import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import React, { useContext, useState } from "react";

import { TitleContext } from "../context/context";
import MenuIcon from "@mui/icons-material/Menu";
import AppSidebar from "./AppSidebar";
import styledlineimage from "../img/styledlineimage.jpg";
import { useUserAuth } from "../context/authContext";

const AppHeader = () => {
  const { user }: any = useUserAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { signOut }: any = useUserAuth();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const value = useContext(TitleContext);

  const handleAuth = () => {
    if (user) {
      signOut();
    }
  };

  return (
    <>
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
              {user !== null && user.username && (
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
                      Welcome, {user.username}
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

            {!user ? (
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
              <Button onClick={handleAuth} color="inherit" href="/">
                <Typography fontFamily={"Times New Roman"} color="black">
                  Sign Out
                </Typography>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default AppHeader;
