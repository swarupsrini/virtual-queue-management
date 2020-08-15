import React, { useState, useEffect } from "react";
import { Paper, IconButton } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import QRCode from "qrcode.react";
import useStyles from "./styles";

import { getUserId } from "../../utils/actions";

export default function DisplayQrPopup(props) {
  const classes = useStyles();
  const [qrValue, setQrValue] = useState("");
  useEffect(() => {
    getUserId(setQrValue);
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <IconButton className={classes.btnBack} onClick={props.close}>
          <ChevronLeftIcon className={classes.iconBack} />
        </IconButton>
        <QRCode value={qrValue} size={400} className={classes.qrDisplay} />,
      </Paper>
    </div>
  );
}
