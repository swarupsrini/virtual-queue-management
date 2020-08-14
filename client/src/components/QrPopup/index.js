import React, { useState, useEffect } from "react";

import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import useStyles from "./styles";

export default function QrPopup(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <IconButton className={classes.btnBack}>
          <ChevronLeftIcon className={classes.iconBack} />
        </IconButton>
      </Paper>
    </div>
  );
}
