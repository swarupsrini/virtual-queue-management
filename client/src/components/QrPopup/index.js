import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";

import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import useStyles from "./styles";

function Button(props) {
  const classes = useStyles();

  return (
    <div
      className={`${props.className} ${classes.btnDiv}`}
      onClick={props.onClick}
    >
      <p className={classes.btnP}>{props.text}</p>
    </div>
  );
}

export default function QrPopup(props) {
  const classes = useStyles();

  const [msg, setMsg] = useState(0); // 0-nothing, 1-valid, 2-invalid

  const onScan = (data) => {
    if (data) console.log(data);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <IconButton className={classes.btnBack} onClick={props.close}>
          <ChevronLeftIcon className={classes.iconBack} />
        </IconButton>
        <QrReader className={classes.qrReader} onScan={onScan} />
        <div className={classes.alertValid}>QR code valid!</div>
        <div className={classes.btnGroupDiv}>
          <Button className={classes.btnLetIn} text="Let inside" />
          <Button className={classes.btnReject} text="Reject" />
        </div>
      </Paper>
    </div>
  );
}
