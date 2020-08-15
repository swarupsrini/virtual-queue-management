import React from "react";

import { Paper } from "@material-ui/core";

import useStyles from "./styles";

export default function AnnouncementPopup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={2} variant="elevation" className={classes.paper}>
        <p className={classes.title}>
          We have detected that you have no store set to your account. Please
          ask your employer to add your username to their store's employee list.
        </p>
      </Paper>
    </div>
  );
}
