import React, { useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SaveButton from "../../components/SaveButton";
import Header from "../../components/Header";

import StoreSettingsPopup from "../../components/StoreSettingsPopup";
import UserSettingsPopup from "../../components/UserSettingsPopup";

import useStyles from "./styles";

function UserSettings() {
  const classes = useStyles();

  const [userName, setUserName] = useState("user");
  const [userError, setUserError] = useState(false);

  const [phone, setPhone] = useState("123456789");
  const [phoneError, setPhoneError] = useState(false);

  const [email, setEmail] = useState("user@user.com");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPassError, setNewPassError] = useState(false);

  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newConfirmPassError, setNewConfirmPassError] = useState(false);

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function saveUserSettings() {
    let updated = [];
    // call server to get all the current info about user
    // call server to change any of them if it's different
    if (!userError && userName !== "" && userName !== "user")
      updated.push("username");
    if (!phoneError && phone !== "" && phone !== "123456789")
      updated.push("phone");
    if (!emailError && email !== "" && email !== "user@user.com")
      updated.push("email");
    if (
      !passError &&
      !newPassError &&
      !newConfirmPassError &&
      password !== newPassword
    )
      updated.push("password");
    if (updated.length > 0) {
      alert(
        "The following fields have been updated: ".concat(updated.join(", "))
      );
    } else {
      alert(
        "No fields have been updated! Please make sure all fields are valid and are different from the current fields!"
      );
    }
  }

  function deactivateAccount() {
    // send a server call to deactivate the account
    alert("Account deactivated!");
  }

  return (
    <Paper elevation={2} variant="elevation" className={classes.paper}>
      <SaveButton onClick={saveUserSettings}></SaveButton>
      <Typography className={classes.title}>User Settings</Typography>

      <div className={classes.topLeftMargin}>
        <TextField
          onChange={(e) => {
            setUserName(e.target.value);
            setUserError(false);
          }}
          value={userName}
          variant="outlined"
          size="small"
          label="Username"
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
          value={phone}
          variant="outlined"
          size="small"
          label="Phone"
          error={phoneError}
          className={`${classes.textField} ${classes.rightMargin}`}
        ></TextField>
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
          value={email}
          variant="outlined"
          size="small"
          label="Email"
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
          value={password}
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
            setNewPassword(e.target.value);
            setNewPassError(false);
          }}
          variant="outlined"
          size="small"
          type={showNewPass ? "text" : "password"}
          label="New Password"
          value={newPassword}
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
            if (e.target.value !== newPassword) {
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

      {/* <Link to="/" className={classes.linkButton}> */}
      <Button
        color="primary"
        variant="contained"
        className={classes.topLeftMargin}
        onClick={deactivateAccount}
      >
        Deactivate Account
      </Button>
      {/* </Link> */}
    </Paper>
  );
}

function StoreSettings() {
  const classes = useStyles();

  // call backend to get user's store existing status and its properties

  const [storeExists, setStoreExists] = useState(false);

  const [storeName, setStoreName] = useState("");
  const [storeError, setStoreError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [employees, setEmployees] = useState([]);

  function saveStoreSettings() {
    let updated = [];
    // call server to get all the current info about user
    // call server to change any of them if it's different
    if (!storeError && storeName !== "" && storeName !== "user")
      updated.push("store name");
  }

  function addEmployee() {
    // call server to add employee to the store list
    const user = prompt("Enter the employee's username here");
    if (user === "") {
      alert("Username cannot be blank!");
    } else if (employees.includes(user)) {
      alert("Employee already added!");
    } else {
      setEmployees([...employees, user]);
    }
  }

  function removeEmployee(user) {
    // call server to remove employee from the store list
    setEmployees(employees.filter((item) => item !== user));
  }

  function createStore() {
    // call server to create a store for the user
    setStoreExists(true);
  }

  function deleteStore() {
    // call server to delete user's store
    setStoreExists(false);
  }

  if (!storeExists) {
    return (
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <Button onClick={createStore} color="primary" variant="contained">
          Create Store
        </Button>
      </Paper>
    );
  } else {
    return (
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <SaveButton onClick={saveStoreSettings}></SaveButton>
        <Typography className={classes.title}>Store Settings</Typography>
        <div className={classes.topLeftMargin}>
          <TextField
            onChange={(e) => {
              setStoreName(e.target.value);
              setStoreError(false);
            }}
            variant="outlined"
            size="small"
            label="Name"
            value={storeName}
            error={storeError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              setAddress(e.target.value);
              setAddressError(false);
            }}
            variant="outlined"
            size="small"
            label="Address"
            value={address}
            error={addressError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
        </div>

        <Typography
          className={`${classes.changePassTitle} ${classes.topLeftMargin}`}
        >
          Employees
          <IconButton onClick={addEmployee}>
            <AddIcon />
          </IconButton>
        </Typography>

        <List className={classes.employeeList}>
          {employees.map((item, i) => (
            <ListItem divider={true} key={i}>
              <ListItemText>{item}</ListItemText>

              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => removeEmployee(item)}>
                  <RemoveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button
          className={classes.topMargin}
          color="default"
          variant="contained"
        >
          Request For Verification
        </Button>
        <br />
        <Button
          className={classes.topMargin}
          onClick={deleteStore}
          color="primary"
          variant="contained"
        >
          Delete Store
        </Button>
      </Paper>
    );
  }
}

export default function SettingsPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header></Header>
      <UserSettingsPopup isAdmin={false} close={() => {}} />
      <StoreSettingsPopup isAdmin={false} close={() => {}} />
      {/* <UserSettings />
      <StoreSettings /> */}
    </div>
  );
}
