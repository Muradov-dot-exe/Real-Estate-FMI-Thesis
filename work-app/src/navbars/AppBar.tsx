import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/authActions";
import { Link } from "react-router-dom";

const HomeBar = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ color: "inherit" }} to={"/"}>
              <Button color="inherit">Home</Button>
            </Link>

            {currentUser && (
              <>
                <Link style={{ color: "inherit" }} to="/products">
                  <Button color="inherit">Products</Button>
                </Link>
                <Link style={{ color: "inherit" }} to={"/locations"}>
                  <Button color="inherit">Location</Button>
                </Link>
              </>
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
  );
};
export default HomeBar;
