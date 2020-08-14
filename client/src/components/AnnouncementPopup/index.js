import React, { useState } from "react";

import { sendAnnouncement } from "../../utils/actions";

import { Paper, IconButton } from "@material-ui/core";

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

export default function AnnouncementPopup(props) {
  const classes = useStyles();

  const [msg, setMsg] = useState("");

  const submit = () => sendAnnouncement(props.store, msg);

  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <IconButton className={classes.btnBack} onClick={props.close}>
          <ChevronLeftIcon className={classes.iconBack} />
        </IconButton>
        <p className={classes.title}>Send an announcement to all users</p>
        <textarea
          className={classes.input}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Message goes here"
        />
        <Button className={classes.btnSend} text="Send" onClick={submit} />
      </Paper>
    </div>
  );
}
