import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "../redux/authActions";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);

  const [credentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, password, displayName, passwordConfirm } = credentials;

  useEffect(() => {
    if (currentUser) {
      navigate("/products");
    } else {
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      return;
    }

    dispatch(registerInitiate(email, password, displayName));
    setCredentials({
      email: "",
      displayName: "",
      password: "",
      passwordConfirm: "",
    });
  };

  const handleCredential = (event: any) => {
    let { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const validateInput = (e: any) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj: any = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (
            credentials.passwordConfirm &&
            value !== credentials.passwordConfirm
          ) {
            stateObj["passwordConfirm"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["passwordConfirm"] = credentials.passwordConfirm
              ? ""
              : error.passwordConfirm;
          }
          break;

        case "passwordConfirm":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (credentials.password && value !== credentials.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="displayName"
                  label="Display name"
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={handleCredential}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user-email"
                  label="Email Address"
                  name="email"
                  type="email"
                  onBlur={validateInput}
                  value={email}
                  onChange={handleCredential}
                />
                {error.email && (
                  <Typography marginTop={"5px"} style={{ color: "red" }}>
                    {error.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onBlur={validateInput}
                  value={password}
                  onChange={handleCredential}
                />
                {error.password && (
                  <Typography marginTop={"5px"} style={{ color: "red" }}>
                    {error.password}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="inputRePassword"
                  label="Confirm Password"
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={handleCredential}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  onBlur={validateInput}
                />
                {error.passwordConfirm && (
                  <Typography marginTop={"5px"} style={{ color: "red" }}>
                    {error.passwordConfirm}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                email === "" || password === "" || passwordConfirm === ""
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid item textAlign={"center"} marginTop={"50px"}>
              <Link href="/">Home</Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
