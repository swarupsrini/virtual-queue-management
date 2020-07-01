import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
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
  halfWidth: {
    width: theme.spacing(146 / 8),
  },
  rightMargin: {
    marginRight: theme.spacing(8 / 8),
  },
  loginButton: {
    marginTop: theme.spacing(40 / 8),
  },
  linkButton: {
    marginTop: theme.spacing(10 / 8),
    textDecoration: "none",
  }
}));

export default function SignupPage(props) {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // const [isError, setIsError] = useState(false);

  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  function postSignup() {
    if (!userError && !phoneError && !emailError && !passError && userName != "" && phone != "" && email != "" && password != "") {
      setLoggedIn(true);
    }
  }

  if (isLoggedIn) {
    return <Redirect to={props.redirect} />;
  }

  return (
    <Container maxWidth={false} className={classes.background}>
      <Paper elevation={2} variant="elevation" className={classes.page}>
        <Typography className={classes.title}>Sign up</Typography>
        <div>
          <TextField 
            onChange={e => {
              setUserName(e.target.value);
              setUserError(false);
            }} 
            variant="outlined" 
            size="small" 
            label="Username"
            className={`${classes.textField} ${classes.rightMargin} ${classes.halfWidth}`}>
          </TextField>
          <TextField 
            onChange={e => {
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
            className={`${classes.textField} ${classes.halfWidth}`}>
          </TextField>
        </div>
        <TextField 
          onChange={e => {
            setEmail(e.target.value);
            const reg = /\S+@\S+\.\S+/;
            if (e.target.value != "" && !reg.test(e.target.value)) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }} 
          variant="outlined" 
          size="small" 
          label="Email"
          error={emailError}
          className={classes.textField}>
        </TextField>
        <TextField 
          onChange={e => {
            setPassword(e.target.value)
            setPassError(false);
          }} 
          variant="outlined" 
          size="small" 
          type="password"
          label="Password"
          className={classes.textField}>
        </TextField>
        <TextField 
          onChange={e => {
            if (e.target.value != password) {
              setPassError(true);
            } else {
              setPassError(false);
            }
          }} 
          variant="outlined" 
          size="small" 
          type="password"
          label="Password"
          error={passError}
          className={classes.textField}>
        </TextField>
        <Button 
          color="primary" 
          variant="contained" 
          onClick={postSignup}
          className={classes.loginButton}>
          Sign up
        </Button>
        <Link to="/" className={classes.linkButton}>
          <Button 
            color="primary" 
            variant="text" 
            >
            Already have an account? Sign in
          </Button>
        </Link>
      </Paper>
    </Container>
  );
}
