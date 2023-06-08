import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginInitiate } from "../redux/authActions";

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

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

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
          }
          break;

        default:
          return "Credentials error";
      }

      return stateObj;
    });
  };

  const { email, password } = credentials;

  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/products");
    } else {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }

    dispatch(loginInitiate(email, password));
    setCredentials({ email: "", password: "" });
  };

  const handleGoogleSubmit = () => {};
  const handleFacebookSubmit = () => {};

  const handleCredential = (event: any) => {
    let { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid item xs>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                type="email"
                onChange={handleCredential}
                onBlur={validateInput}
              />
              {error.email && (
                <Typography style={{ color: "red" }}>{error.email}</Typography>
              )}
            </Grid>
            <Grid item xs>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleCredential}
                onBlur={validateInput}
              />
              {error.password && (
                <Typography style={{ color: "red" }}>
                  {error.password}
                </Typography>
              )}
            </Grid>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Grid container>
              <Grid item xs>
                <Button
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faGoogle} />}
                  color="error"
                  onClick={handleGoogleSubmit}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={handleFacebookSubmit}
                  startIcon={<FontAwesomeIcon icon={faFacebookF} />}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={10}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
