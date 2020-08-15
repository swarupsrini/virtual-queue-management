import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  getUserById,
  getUserStore,
  saveUserSettingsCall,
  getCurrentUser,
} from "../../utils/actions";

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
import SaveButton from "../SaveButton";

import useStyles from "./styles";

export default function UserSettingsPopup(props) {
  const classes = useStyles();

  const [userError, setUserError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const setUserVal = (key, value) =>
    setUser((user) => ({ ...user, [key]: value }));

  /*useEffect(() => {
    if (props.id) getUserById(props.id, setUser);
    else getUserStore(setUser, () => {});
  }, [props.id]);*/
  useEffect(() => {
    getCurrentUser((user)=>{
      user.password = ""
      setUser(user)
    })
    console.log(user)
    //getUserById(props.id, setUser);
  }, [props.id]);

  const [newPassError, setNewPassError] = useState(false);

  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newConfirmPassError, setNewConfirmPassError] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function saveUserSettings() {
    const errors = saveUserSettingsCall(
      user,
      setUser,
      setUserError,
      setPhoneError,
      setEmailError,
      setPassError,
      setNewPassError
    );
    if (errors.length > 0)
      alert(
        "No fields have been updated! Please make sure all fields are valid!"
      );
    else alert("Your settings have been updated!");

    // all this stuff must go to backend
    // let updated = [];
    // if (!userError && user.username !== "" && user.username !== "user")
    //   updated.push("username");
    // if (
    //   !phoneError &&
    //   user.phone_number !== "" &&
    //   user.phone_number !== "123456789"
    // )
    //   updated.push("phone");
    // if (!emailError && user.email !== "" && user.email !== "user@user.com")
    //   updated.push("email");
    // if (
    //   !passError &&
    //   !newPassError &&
    //   !newConfirmPassError &&
    //   user.password !== newPassword
    // )
    //   updated.push("password");
    // if (updated.length > 0) {
    //   alert(
    //     "The following fields have been updated: ".concat(updated.join(", "))
    //   );
    // } else {
    //   alert(
    //     "No fields have been updated! Please make sure all fields are valid and are different from the current fields!"
    //   );
    // }
    props.close();
  }

  function deactivateAccount() {
    // send a server call to deactivate the account
    alert("Account deactivated!");
    props.close();
  }

  return (
    <div className={props.isAdmin ? classes.root : classes.rootFlow}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <SaveButton onClick={saveUserSettings}></SaveButton>
        <Typography className={classes.title}>User Settings</Typography>

        <div className={classes.topLeftMargin}>
          {props.isAdmin && user.store_id && (
            <TextField
              variant="outlined"
              size="small"
              label="Store ID"
              disabled
              value={user.store_id}
              className={`${classes.textField} ${classes.rightMargin} ${classes.bottomMargin}`}
            ></TextField>
          )}
          <TextField
            onChange={(e) => {
              setUserVal("username", e.target.value);
              setUserError(false);
            }}
            value={user.username}
            variant="outlined"
            size="small"
            label="Username"
            error={userError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              setUserVal("phone_number", e.target.value);
              if (isNaN(e.target.value)) {
                setPhoneError(true);
              } else {
                setPhoneError(false);
              }
            }}
            value={user.phone_number}
            variant="outlined"
            size="small"
            label="Phone"
            error={phoneError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              setUserVal("email", e.target.value);
              const reg = /\S+@\S+\.\S+/;
              if (e.target.value !== "" && !reg.test(e.target.value)) {
                setEmailError(true);
              } else {
                setEmailError(false);
              }
            }}
            value={user.email}
            variant="outlined"
            size="small"
            label="Email"
            error={emailError}
            className={classes.textField}
          ></TextField>
        </div>

        {!props.isAdmin && (
          <>
            <Typography
              className={`${classes.changePassTitle} ${classes.topLeftMargin}`}
            >
              Change Password
            </Typography>

            <div className={classes.topLeftMargin}>
              <TextField
                onChange={(e) => {
                  setUserVal("password", e.target.value);
                  setPassError(false);
                }}
                variant="outlined"
                size="small"
                type={showPass ? "text" : "password"}
                value={user.password}
                label="Old Password"
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
                  setUserVal("new_password", e.target.value);
                  setNewPassError(false);
                }}
                variant="outlined"
                size="small"
                type={showNewPass ? "text" : "password"}
                label="New Password"
                value={user.new_password}
                error={newPassError}
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
                  setNewConfirmPassword(e.target.value);
                  if (e.target.value !== user.new_password) {
                    setNewConfirmPassError(true);
                  } else {
                    setNewConfirmPassError(false);
                  }
                }}
                variant="outlined"
                size="small"
                type={showConfirmPass ? "text" : "password"}
                value={newConfirmPassword}
                label="Confirm Password"
                error={newConfirmPassError}
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
          </>
        )}
        {props.isAdmin ? (
          <Button
            color="primary"
            variant="contained"
            className={classes.topLeftMargin}
            onClick={deactivateAccount}
          >
            Deactivate Account
          </Button>
        ) : (
          <Link to="/" className={classes.linkButton}>
            <Button
              color="primary"
              variant="contained"
              className={classes.topLeftMargin}
              onClick={deactivateAccount}
            >
              Deactivate Account
            </Button>
          </Link>
        )}
      </Paper>
    </div>
  );
}
