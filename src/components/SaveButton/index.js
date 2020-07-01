/*
Secondary Button: Used to represent Buttons that save the current state of the app (info such as passwords, email etc)

onClick: Called when save button is clicked

Example: <SaveButton 
			onClick={() => { console.log("save clicked") }}>
		</SaveButton>

*/

import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#A8E071",
    width: theme.spacing(160 / 8),
    height: theme.spacing(52 / 8),
    borderRadius: 10,
    fontSize: 24,
    float: "right",
  },
}));

export default function SaveButton(props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      variant="contained"
      onClick={props.onClick}
    >
      Save
    </Button>
  );
}
