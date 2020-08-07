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
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";

import useStyles from "./styles";

export default function SignupPage(props) {
  const classes = useStyles();

  const [user, setUser] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState("");

  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState(false);

  function postSignup() {
    if (userName === "") setUserError(true);
    if (phone === "") setPhoneError(true);
    if (email === "") setEmailError(true);
    if (password === "") setPassError(true);
    if (type === "") setTypeError(true);
    if (
      !userError &&
      !phoneError &&
      !emailError &&
      !passError &&
      !typeError &&
      userName !== "" &&
      phone !== "" &&
      email !== "" &&
      password !== ""
    ) {
      // call backend to sign up, get the user (if valid) and pass it in below
      setUser({});
      setLoggedIn(true);
    }
  }

  if (isLoggedIn) {
    props.onSubmit(user);
  }

  return (
    <Container maxWidth={false} className={classes.background}>
      <Paper elevation={2} variant="elevation" className={classes.page}>
        <Typography className={classes.title}>Sign up</Typography>
        <div>
          <TextField
            onChange={(e) => {
              setUserName(e.target.value);
              setUserError(false);
            }}
            variant="outlined"
            size="small"
            label="Username"
            error={userError}
            className={`${classes.textField} ${classes.rightMargin} ${classes.halfWidth}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              setPhone(e.target.value);
              if (isNaN(e.target.value)) {
                setPhoneError(true);
              } else {
                setPhoneError(false);
              }
            }}
            variant="outlined"
            size="small"
            label="Phone"
            error={phoneError}
            className={`${classes.textField} ${classes.halfWidth}`}
          ></TextField>
        </div>
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            const reg = /\S+@\S+\.\S+/;
            if (e.target.value !== "" && !reg.test(e.target.value)) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }}
          variant="outlined"
          size="small"
          label="Email"
          error={emailError}
          className={classes.textField}
        ></TextField>
        <div>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(false);
            }}
            variant="outlined"
            size="small"
            type={showPassword ? "text" : "password"}
            label="Password"
            error={passError}
            className={`${classes.textField} ${classes.rightMargin} ${classes.halfWidth}`}
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
          <TextField
            onChange={(e) => {
              if (e.target.value !== password) {
                setPassError(true);
              } else {
                setPassError(false);
              }
            }}
            variant="outlined"
            size="small"
            type={showConfirmPass ? "text" : "password"}
            label="Confirm"
            error={passError}
            className={`${classes.textField} ${classes.halfWidth}`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                  >
                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <TextField
          onChange={(e) => {
            setType(e.target.value);
            setTypeError(false);
          }}
          variant="outlined"
          size="small"
          label="User Type"
          error={typeError}
          className={classes.textField}
          select
        >
          <MenuItem value="owner">Store owner</MenuItem>
          <MenuItem value="employee">Store employee</MenuItem>
          <MenuItem value="visitor">Store visitor</MenuItem>
        </TextField>
        <Button
          color="primary"
          variant="contained"
          onClick={postSignup}
          className={classes.loginButton}
        >
          Sign up
        </Button>
        <Link to="/" className={classes.linkButton}>
          <Button color="primary" variant="text">
            Already have an account? Sign in
          </Button>
        </Link>
      </Paper>
    </Container>
  );
}
