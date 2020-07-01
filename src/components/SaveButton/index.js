/*
Secondary Button: Used to represent Buttons that save the current state of the app (info such as passwords, email etc)

onClick: Called when save button is clicked

Example: <SaveButton 
			onClick={() => { console.log("save clicked") }}>
		</SaveButton>

*/

import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';

const useStyles = makeStyles({
  green: {
    backgroundColor: lightGreen[500],
  }
});

export default function SaveButton(props) {
  const classes = useStyles();
  return (
    <Button className={classes.green} variant="contained" onClick={props.onClick} size="large">Save</Button>
  );
}