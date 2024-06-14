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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserAuth } from "../context/authContext";
import { Alert } from "@mui/material";
import axios from "axios";

interface CopyrightProps {
  sx?: object;
}

function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Gold Estate Ltd © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const buttonStyles = {
  "&:hover": {
    backgroundColor: "orange",
  },
  mt: 3,
  mb: 2,
  backgroundColor: "#aa6c39",
};

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useUserAuth();
  const [errorMsg, setErrorMsg] = React.useState<null | string>(null);
  const [forgottenPassErr, setForgottenPassErr] = React.useState<null>(null);
  const [recoverPassSuccess, setRecoverPassSuccess] =
    React.useState<JSX.Element | null>(null);
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;
  const { user } = useUserAuth();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    setForgottenPassErr(null);
    setRecoverPassSuccess(null);
  }, [username]);

  const forgottenPassword = async () => {
    try {
      if (forgottenPassErr === null) {
        setRecoverPassSuccess(
          <Alert severity="success">Recover e-mail sent</Alert>
        );
      }
    } catch (error: any) {
      setForgottenPassErr(error.message);
    }
  };

  const notif = () => {
    toast.info("Successful sign in !");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;

    if (!username || !password) {
      return;
    }

    try {
      await signIn(username, password);

      notif();
    } catch (error: any) {
      setErrorMsg("Wrong username or password !");
    }
  };

  const handleCredential = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
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
        {errorMsg !== null && (
          <>
            <br />
            <Alert severity="error">{errorMsg}</Alert>
          </>
        )}
        {forgottenPassErr !== null && recoverPassSuccess === null && (
          <>
            <br />
            <Alert severity="error">{forgottenPassErr}</Alert>
          </>
        )}
        {recoverPassSuccess !== null && (
          <>
            <br />
            {recoverPassSuccess}
          </>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            type="text"
            onChange={handleCredential}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            sx={{ mb: 3 }}
            onChange={handleCredential}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={buttonStyles}
            disabled={username.length === 0 || password.length === 0}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={5.5}>
              <Link href="#" variant="body2" onClick={forgottenPassword}>
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
      <Copyright sx={{ mt: 12.2 }} />
    </Container>
  );
}

export default SignIn;
