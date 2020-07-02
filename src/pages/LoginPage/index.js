import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(572 / 8),
    height: theme.spacing(481 / 8),
  },
  title: {
    fontSize: 48,
  },
  textField: {
    marginTop: theme.spacing(16 / 8),
    width: theme.spacing(300 / 8),
  },
  loginButton: {
    marginTop: theme.spacing(40 / 8),
  },
  linkButton: {
    marginTop: theme.spacing(10 / 8),
    textDecoration: "none",
  },
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  function postLogin() {
    if (userName === "user" && password === "user") {
      setLoggedIn(true);
    } else {
      setIsError(true);
    }
  }

  if (isLoggedIn) {
    return <Redirect to={props.redirect} />;
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.page}>
        <Typography className={classes.title}>Log in</Typography>
        <TextField
          onChange={(e) => {
            setUserName(e.target.value);
            setIsError(false);
          }}
          variant="outlined"
          size="small"
          label="Username"
          error={isError}
          className={classes.textField}
        ></TextField>
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
            setIsError(false);
          }}
          variant="outlined"
          size="small"
          type={showPassword ? "text" : "password"}
          label="Password"
          error={isError}
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button
          color="primary"
          variant="contained"
          onClick={postLogin}
          className={classes.loginButton}
        >
          Log In
        </Button>
        <Link to="/signup" className={classes.linkButton}>
          <Button color="primary" variant="text">
            Don't have an account? Sign up
          </Button>
        </Link>
      </Paper>
    </Container>
  );
}
