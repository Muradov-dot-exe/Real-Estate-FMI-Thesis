import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
import { Alert } from "@mui/material";
import { validateEmail } from "./emailRegex";
import { useUserAuth } from "../context/authContext";
import { TitleContext } from "../context/context";

function SignUp() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const { signUp } = useUserAuth();
  const [emailAlert, setEmailAlert] = useState<null | JSX.Element>(null);
  const [passwordError, setPasswordError] = useState<null | JSX.Element>(null);
  const [passLengthError, setPassLengthError] = React.useState<
    undefined | JSX.Element | null
  >(undefined);

  const value = useContext(TitleContext);
  useEffect(() => {
    value.setTitle("Sign Up");
  }, [value]);

  const { user } = useUserAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, password, username, passwordConfirm } = credentials;

  const buttonStyles = {
    "&:hover": {
      backgroundColor: "orange",
    },
    mt: 3,
    mb: 2,
    backgroundColor: "#aa6c39",
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      return;
    }

    if (!password || password.length < 10) {
      return setPassLengthError(
        <Alert severity="error">
          Password must be at least 10 characters long
        </Alert>
      );
    } else {
      setPassLengthError(null);
    }

    if (password !== passwordConfirm) {
      return setPasswordError(
        <Alert severity="error">Passwords do not match!</Alert>
      );
    } else if (password === passwordConfirm) {
      setPasswordError(null);
    }

    if (validateEmail(email)?.input === undefined) {
      return setEmailAlert(<Alert severity="error">Bad Email Format!</Alert>);
    } else if (validateEmail(email)?.input !== undefined) {
      setEmailAlert(null);
    }

    try {
      await signUp(email, password, username);

      navigate("/signin");
    } catch (error: any) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        setErrorMsg("No response received from the server");
      } else {
        setErrorMsg("Error setting up the request");
      }
    }
  };

  const handleCredential = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
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
        {errorMsg !== null && (
          <>
            <br />
            <Alert severity="error">{errorMsg}</Alert>
          </>
        )}
        {emailAlert !== null && (
          <>
            <br />
            {emailAlert}
          </>
        )}
        {passwordError !== null && (
          <>
            <br />
            {passwordError}
          </>
        )}
        {passLengthError !== undefined && (
          <>
            <br />
            {passLengthError}
          </>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                type="text"
                value={username}
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
                value={email}
                onChange={handleCredential}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleCredential}
              />
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
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={buttonStyles}
            disabled={email.length === 0 || password.length === 0}
          >
            <Typography fontFamily={"Times New Roman"}>Sign Up</Typography>
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Grid item textAlign={"center"} marginTop={"50px"}>
            <Link href="/">
              <Typography fontFamily={"Times New Roman"}>Home</Typography>
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
