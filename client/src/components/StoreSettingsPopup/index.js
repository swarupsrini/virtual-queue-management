// const datetime = require("date-and-time");

import datetime from "date-and-time";

import React, { useState, useEffect } from "react";

import {
  resetStoreCall,
  saveStoreSettingsCall,
  saveStoreSettingsCallAdmin,
  getStoreById,
  getUserStore,
  checkValidEmployee,
  grantVerificationCall,
} from "../../utils/actions";

import {
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SaveButton from "../../components/SaveButton";

import useStyles from "./styles";

export default function StoreSettings(props) {
  const classes = useStyles();

  // call backend to get user's store existing status and its properties

  const [store, setStore] = useState({
    owner_id: "1",
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    employee_ids: [],
    open_time: datetime.parse("09:00:00 AM", "hh:mm:ss A"),
    close_time: datetime.parse("08:00:00 PM", "hh:mm:ss A"),
  });

  const setStoreVal = (key, value) => setStore({ ...store, [key]: value });

  useEffect(() => {
    console.log(typeof store.open_time);
    console.log(typeof store.close_time);
  }, [store]);

  useEffect(() => {
    if (props.id) {
      getStoreById(props.id, (res) => {
        setStore(res);
      });
    } else {
      getUserStore(
        () => {},
        (store1) => {
          setStore({
            name: store1.name,
            address: store1.address,
            open_time: datetime.parse(store1.open_time, "hh:mm:ss A"),
            close_time: datetime.parse(store1.close_time, "hh:mm:ss A"),
            owner_id: store1.owner_id,
            employee_ids: store1.employee_ids,
          });
        }
      );
    }
  }, []);

  const [storeError, setStoreError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [openTimeError, setOpenTimeError] = useState(false);
  const [closeTimeError, setCloseTimeError] = useState(false);

  function saveStoreSettings() {
    if (props.isAdmin) saveStoreSettingsCallAdmin(store, setStore);
    else saveStoreSettingsCall(store, setStore);

    if (props.isAdmin) {
      props.close();
    }
    // put in backend
    //   let updated = [];
    //   // call server to get all the current info about user
    //   // call server to change any of them if it's different
    //   if (!storeError && store.name !== "" && store.name !== "user")
    //     updated.push("store name");
  }

  function addEmployee() {
    // call server to add employee to the store list
    const user = prompt("Enter the employee's username here");
    if (user === "") {
      alert("Username cannot be blank!");
    } else if (store.employee_ids.includes(user)) {
      alert("Employee already added!");
    } else {
      checkValidEmployee(user, (res) => {
        if (res.valid === "correct") {
          setStoreVal("employee_ids", [...store.employee_ids, user]);
        } else {
          alert("Employee is enrolled in another store or username is invalid");
        }
      });
    }
  }

  function removeEmployee(user) {
    // call server to remove employee from the store list
    setStoreVal(
      "employee_ids",
      store.employee_ids.filter((item) => item !== user)
    );
  }

  const resetStore = () => resetStoreCall(setStore);

  const grantVerification = () => {
    console.log(store);
    grantVerificationCall(store, setStore, !store.verified);
  };

  return (
    <div className={props.isAdmin ? classes.root : ""}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <SaveButton onClick={saveStoreSettings}></SaveButton>
        <Typography className={classes.title}>Store Settings</Typography>
        <div className={classes.topLeftMargin}>
          {props.isAdmin && (
            <TextField
              variant="outlined"
              size="small"
              label="Owner ID"
              disabled
              value={store.owner_id}
              className={`${classes.textField} ${classes.rightMargin}`}
            ></TextField>
          )}

          <TextField
            onChange={(e) => {
              setStoreVal("name", e.target.value);
              setStoreError(false);
            }}
            variant="outlined"
            size="small"
            label="Name"
            value={store.name}
            error={storeError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              setStoreVal("address", e.target.value);
              setAddressError(false);
            }}
            variant="outlined"
            size="small"
            label="Address"
            value={store.address}
            error={addressError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              const time = datetime.parse(e.target.value, "hh:mm:ss A");
              if (isNaN(time)) setOpenTimeError(true);
              else {
                setOpenTimeError(false);
                setStoreVal("open_time", time);
              }
            }}
            variant="outlined"
            size="small"
            label="Open time"
            value={store.open_time}
            error={openTimeError}
            className={`${classes.textField} ${classes.rightMargin}`}
          ></TextField>
          <TextField
            onChange={(e) => {
              const time = datetime.parse(e.target.value, "hh:mm:ss A");
              if (isNaN(time)) setCloseTimeError(true);
              else {
                setCloseTimeError(false);
                setStoreVal("close_time", time);
              }
            }}
            variant="outlined"
            size="small"
            label="Close time"
            value={store.close_time}
            error={closeTimeError}
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
          {store.employee_ids.map((item, i) => (
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

        {props.isAdmin && (
          <Button
            className={classes.topMargin}
            color="default"
            variant="contained"
            onClick={grantVerification}
          >
            {!store.verified ? "Grant Verification" : "Remove Verification"}
          </Button>
        )}
        <br />
        <Button
          className={classes.topMargin}
          onClick={resetStore}
          color="primary"
          variant="contained"
        >
          Reset Store
        </Button>
      </Paper>
    </div>
  );
}
