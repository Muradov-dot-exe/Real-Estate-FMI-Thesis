import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/authActions";
import TemporaryDrawer from "./AppSidebar";

const AppHeader = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box>
              <TemporaryDrawer />
            </Box>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
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
  );
};
export default AppHeader;
