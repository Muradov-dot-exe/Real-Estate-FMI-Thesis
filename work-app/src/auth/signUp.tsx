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
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TitleContext } from "../context/context";
import { useUserAuth } from "../context/authContext";
import { Alert } from "@mui/material";
import { validateEmail } from "./emailRegex";
import { toast } from "react-toastify";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright Gold Estate Ltd © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const { signUp }: any = useUserAuth();
  const [emailAlert, setEmailAlert] = useState<any>(null);
  const [passwordError, setPasswordError] = useState<any>(null);

  const value = useContext(TitleContext);
  useEffect(() => {
    value.setTitle("Sign Up");
  }, [value]);

  const { currentUser } = useSelector((state: any) => state.user);

  const [credentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, password, displayName, passwordConfirm } = credentials;

  const buttonStyles = {
    "&:hover": {
      backgroundColor: "orange", // Change to your desired color
    },
    mt: 3,
    mb: 2,
    backgroundColor: "#aa6c39",
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/products");
    } else {
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);

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
      await signUp(email, password, displayName);
      notif();
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };
  const notif = () => {
    toast.info("Successful sign up !");
  };

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
            Sign up
          </Typography>
          {errorMsg !== null && (
            <>
              <br></br>
              <Alert severity="error">{errorMsg}</Alert>
            </>
          )}
          {emailAlert !== null && (
            <>
              <br></br>
              {emailAlert}
            </>
          )}
          {passwordError !== null && (
            <>
              <br></br>
              {passwordError}
            </>
          )}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
