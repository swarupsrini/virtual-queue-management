import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import useStyles from "./styles";

export default function LoginPage(props) {
  const classes = useStyles();
  // const [user, setUser] = useState({});
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  function postLogin() {
    if (
      (userName === "user" && password === "user") ||
      (userName === "admin" && password === "admin")
    ) {
      // call backend to login, get the user (if valid) and pass it in below
      props.postUser({ username: "user" });
      // setLoggedIn(true);
    } else {
      setIsError(true);
    }
  }
  console.log(props.user);
  if (JSON.stringify(props.user) !== JSON.stringify({})) {
    return props.loginRedirect(props.user);
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
