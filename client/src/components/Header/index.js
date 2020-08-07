import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

import useStyles from "./styles";

function getPageTitle(location) {
  const temp = location.substring(1, location.length).split("-");
  let title = "";
  for (let i = 0; i < temp.length; i++) {
    title += temp[i].charAt(0).toUpperCase();
    title += temp[i].substring(1, temp[i].length) + " ";
  }
  return title;
}

export default function Header(props) {
  const classes = useStyles();
  let location = useLocation();

  return (
    <div>
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h4" className={classes.title}>
            {getPageTitle(location.pathname)}
          </Typography>

          <Typography variant="h4" className={classes.linkTypo}>
            <Link to="/settings" className={classes.Link}>
              <Button color="inherit">Settings</Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.spacerDiv}></div>
    </div>
  );
}
