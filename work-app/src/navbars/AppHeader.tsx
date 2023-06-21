import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/authActions";
import { TitleContext } from "../context/context";
import { toast } from "react-toastify";

const AppHeader = () => {
  const { currentUser } = useSelector((state: any) => state.user);
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
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography>{value.title}</Typography>
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
    </>
  );
};
export default AppHeader;
