import React, { useState } from "react";
import QrReader from "react-qr-reader";

import { Paper, IconButton } from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

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
  console.log(props.validData);
  const classes = useStyles();

  const [msg, setMsg] = useState(0); // 0-nothing, 1-valid, 2-invalid

  const onScan = (data) => {
    if (data && data === props.validData) {
      setMsg(1);
      setTimeout(() => setMsg(0), 2000);
    } else if (data) {
      setMsg(2);
      setTimeout(() => setMsg(0), 2000);
    }
  };

  const onError = (err) => console.error(err);

  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <IconButton className={classes.btnBack} onClick={props.close}>
          <ChevronLeftIcon className={classes.iconBack} />
        </IconButton>
        <QrReader
          className={classes.qrReader}
          onScan={onScan}
          onError={onError}
        />
        {msg === 1 && (
          <div className={`${classes.alert} ${classes.alertValid}`}>
            QR code valid!
            <CheckIcon className={classes.alertIcon} />
          </div>
        )}
        {msg === 2 && (
          <div className={`${classes.alert} ${classes.alertInvalid}`}>
            QR code invalid!
            <CloseIcon className={classes.alertIcon} />
          </div>
        )}
        <div className={classes.btnGroupDiv}>
          <Button
            className={classes.btnLetIn}
            onClick={() => {
              props.accept();
              props.close();
            }}
            text="Let inside"
          />
          <Button
            className={classes.btnReject}
            onClick={() => {
              props.reject();
              props.close();
            }}
            text="Reject"
          />
        </div>
      </Paper>
    </div>
  );
}
