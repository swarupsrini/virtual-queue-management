import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import "./Header.css";

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
  }
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar variant="dense">

        <Typography variant="h4" className={classes.title}>
          {props.pageTitle}
        </Typography>

        <Link to="/search" className="pageTitleLeft"><h3 className="links"> STORE SEARCH </h3></Link>
        <Link to="/admin-panel" className="pageTitleLeft"><h3 className="links"> ADMIN PANEL </h3></Link>

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