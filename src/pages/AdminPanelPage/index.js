import React, { useState, useEffect } from "react";
import {
  Popover,
  List,
  ListItem,
  ListItemSecondaryAction,
  Switch,
  ListItemText,
  Typography,
} from "@material-ui/core";
import StoreCard from "../../components/StoreCard";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { makeStyles } from "@material-ui/core/styles";

function getStores() {
  // Get stores from server
  // code below requires backend call
  return [
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 12,
      ID: 0,
      isVerified: true,
    },
    {
      name: "No Frills",
      address: "4473 Kingston Rd, Scarborough, ON M1E 2N7",
      latitude: 43.76984,
      longitude: -79.18742,
      ID: 1,
      wait: 9,
      isVerified: false,
    },
    {
      name: "FreshCo",
      address: "650 Kingston Rd, Pickering, ON L1V 1A6",
      latitude: 43.81807,
      longitude: -79.11887,
      ID: 2,
      wait: 24,
      isVerified: true,
    },
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 100,
      ID: 4,
      isVerified: false,
    },
  ];
}

function getUsers() {
  return [
    { name: "hemantb3434", ID: 11 },
    { name: "swarupsrini", ID: 12 },
    { name: "jasonconte131", ID: 13 },
  ];
}

const useStyles = makeStyles((theme) => ({
  search: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(10),
  },
  popup: {
    width: "260px",
    backgroundColor: "white",
  },
  titles: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3),
  },
}));

export default function AdminPanelPage(props) {
  const [anchor, setAnchor] = useState(null);
  const [text, setText] = useState("");
  const [showUsers, setShowUsers] = useState(true);
  const [showStores, setShowStores] = useState(true);

  const classes = useStyles();

  useEffect(() => {}, [showUsers, showStores]);
  function searchBarClicked() {}

  return (
    <div>
      <Header></Header>
      <div className={classes.search}>
        <Search
          filterClick={(e) => {
            setAnchor(e.currentTarget);
          }}
          searchClick={searchBarClicked}
          text={text}
        />
      </div>

      {showStores && (
        <Typography variant="h4" className={classes.titles}>
          Stores
        </Typography>
      )}

      {showUsers && (
        <Typography variant="h4" className={classes.titles}>
          Users
        </Typography>
      )}

      <Popover
        id={"popover"}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List className={classes.popup}>
          <ListItem>
            <Typography variant="h4">Filter</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Show users" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={() => {
                  setShowUsers((prev) => !prev);
                }}
                checked={showUsers}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Show stores" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={() => {
                  setShowStores((prev) => !prev);
                }}
                checked={showStores}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
