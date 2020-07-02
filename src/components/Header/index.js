import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  accountIcon: {
    float: "left",
  },
  title: {
    flexGrow: 1,
    fontSize: "25px",
  },
  linkTypo: {
    fontSize: "15px",
  },
  Link: {
    textDecoration: "none",
    paddingLeft: "15px",
    color: "white",
  },
  spacerDiv: {
    marginTop: "48px",
  },
}));

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
            <Link to="/store-search" className={classes.Link}>
              <Button color="inherit">Store Search</Button>
            </Link>
            <Link to="/admin-panel" className={classes.Link}>
              <Button color="inherit">Admin Panel</Button>
            </Link>
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
