import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useLocation } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
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
}));

function getPageTitle(location) {
  const temp = location.substring(1, location.length).split("-");
  let title = ""
  for (let i = 0; i < temp.length; i++) {
    title += temp[i].charAt(0).toUpperCase()
    title += temp[i].substring(1, temp[i].length) + " "
  }
  return title
}

export default function Header(props) {
  const classes = useStyles();
  let location = useLocation();

  return (
    <AppBar>
      <Toolbar variant="dense">

        <Typography variant="h4" className={classes.title}>
          {getPageTitle(location.pathname)}
        </Typography>

        <Typography variant="h4" className={classes.linkTypo}>
          <Link to="/search" className={classes.Link}> STORE SEARCH </Link>
          <Link to="/admin-panel" className={classes.Link}> ADMIN PANEL </Link>
        </Typography>

        <IconButton className={classes.accountIcon}
          onClick={() => console.log("clicked account icon")}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar >
  );
}