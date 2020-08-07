/*
Secondary Button: Used to represent Buttons that save the current state of the app (info such as passwords, email etc)

onClick: Called when save button is clicked

Example: <SaveButton 
			onClick={() => { console.log("save clicked") }}>
		</SaveButton>

*/

import React from "react";
import Button from "@material-ui/core/Button";

import useStyles from "./styles";

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
