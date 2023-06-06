import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

const HomeBar = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setAuthUser(user) : setAuthUser(null);
    });
    return () => {
      listener();
    };
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => console.log(error));
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
            <Button color="inherit" href="/">
              Home
            </Button>
            {authUser && (
              <>
                <Button color="inherit" href="/products">
                  Products
                </Button>
                <Button color="inherit">Locations</Button>
              </>
            )}
          </Typography>
          {!authUser ? (
            <>
              <Button color="inherit" href="/signup">
                Sign Up
              </Button>
              <Button color="inherit" href="/signin">
                Sign In
              </Button>
            </>
          ) : (
            <Button onClick={userSignOut} color="inherit" href="/">
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HomeBar;
