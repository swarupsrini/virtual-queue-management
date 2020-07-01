import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import SaveButton from "../../components/SaveButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: theme.spacing(1000 / 8),
    marginTop: theme.spacing(50 / 8),
    padding: theme.spacing(25 / 8),
  },
  title: {
    fontSize: 36,
  },
  changePassTitle: {
    fontSize: 24,
  },
  textField: {
    width: theme.spacing(250 / 8),
  },
  topLeftMargin: {
    marginTop: theme.spacing(20 / 8),
    marginLeft: theme.spacing(20 / 8),
  },
  rightMargin: {
    marginRight: theme.spacing(50 / 8),
  },
  linkButton: {
    textDecoration: "none",
  },
}));

export default function SettingsPage() {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPassError, setNewPassError] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function saveUserSettings() {
    if (userName == "") setUserError(true);
    if (phone == "") setPhoneError(true);
    if (email == "") setEmailError(true);
    if (password == "") setPassError(true);
    if (newPassword == "") setNewPassError(true);
    if (
      !userError &&
      !phoneError &&
      !emailError &&
      !passError &&
      !newPassError &&
      userName != "" &&
      phone != "" &&
      email != "" &&
      password != "" &&
      newPassword != ""
    ) {
      alert("Saved!");
    }
  }

  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <SaveButton onClick={saveUserSettings}></SaveButton>
        <Typography className={classes.title}>User Settings</Typography>

        <div className={classes.topLeftMargin}>
          <TextField
            onChange={(e) => {
              setUserName(e.target.value);
              setUserError(false);
            }}
            variant="outlined"
            size="small"
            label="Username"
            defaultValue="Current Name"
            error={userError}
            className={`${classes.textField} ${classes.rightMargin}`}
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
            defaultValue="Current Phone"
            error={phoneError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
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
            defaultValue="Current Email"
            error={emailError}
            className={classes.textField}
          ></TextField>
        </div>

        <Typography
          className={`${classes.changePassTitle} ${classes.topLeftMargin}`}
        >
          Change Password
        </Typography>

        <div className={classes.topLeftMargin}>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(false);
            }}
            variant="outlined"
            size="small"
            type={showPass ? "text" : "password"}
            label="Old Password"
            defaultValue="Old Password"
            error={passError}
            className={`${classes.textField} ${classes.rightMargin}`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPassError(false);
            }}
            variant="outlined"
            size="small"
            type={showNewPass ? "text" : "password"}
            label="New Password"
            error={passError}
            className={`${classes.textField} ${classes.rightMargin}`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPass(!showNewPass)}>
                    {showNewPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPassError(false);
            }}
            variant="outlined"
            size="small"
            type={showConfirmPass ? "text" : "password"}
            label="Confirm Password"
            error={passError}
            className={`${classes.textField} ${classes.rightMargin}`}
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
        <Link to="/" className={classes.linkButton}>
          <Button
            color="primary"
            variant="contained"
            className={classes.topLeftMargin}
          >
            Deactivate Account
          </Button>
        </Link>
      </Paper>

      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <SaveButton
          onClick={() => {
            console.log("save clicked");
          }}
        ></SaveButton>
        <Typography className={classes.title}>Store Settings</Typography>
      </Paper>
    </div>
  );
}
