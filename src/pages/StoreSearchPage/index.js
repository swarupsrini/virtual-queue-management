import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import StoreCard from "../../components/StoreCard";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Switch,
  ListItemText,
  Typography,
} from "@material-ui/core";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import Search from "../../components/Search";
import Popover from "@material-ui/core/Popover";

import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  leftOverlay: {
    position: "fixed",
    maxHeight: "calc(100% - 75px)",
    overflow: "auto",
  },
  popup: {
    width: "261px",
    backgroundColor: "white",
  },
}));

export default function StoreSearchPage(props) {
  const classes = useStyles();
  const [distance, setDist] = useState(false);
  const [waitTime, setWait] = useState(false);
  const [fav, setFav] = useState(false);

  const [anchor, setAnchor] = useState(null);
  const [stores, setStores] = useState([
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.7763,
      longitude: -79.25802,
      wait: 12,
      ID: 0,
    },
    {
      name: "No Frills",
      address: "4473 Kingston Rd, Scarborough, ON M1E 2N7",
      latitude: 43.76984,
      longitude: -79.18742,
      ID: 1,
      wait: 9,
    },
    {
      name: "FreshCo",
      address: "650 Kingston Rd, Pickering, ON L1V 1A6",
      latitude: 43.81807,
      longitude: -79.11887,
      ID: 2,
      wait: 24,
    },
  ]);

  const [user, setUser] = useState({
    favs: [],
  });

  function toggleDist() {
    if (waitTime === true) {
      setDist(true);
      setWait(false);
    } else {
      setDist((prev) => !prev);
    }
  }
  function toggleWait() {
    if (distance === true) {
      setDist(false);
      setWait(true);
    } else {
      setWait((prev) => !prev);
    }
  }
  function toggleFav() {
    setFav((prev) => !prev);
  }

  function sortByWait() {}

  function sortByDist() {}

  function displayFav() {}

  return (
    <div className={classes.root}>
      <Map center={[43.653689, -79.385906]} zoom={12} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stores.map((store) => (
          <Marker
            key={store.ID}
            position={[store.latitude, store.longitude]}
          ></Marker>
        ))}
      </Map>
      <List className={classes.leftOverlay}>
        <ListItem>
          <Search
            filterClick={(e) => {
              setAnchor(e.currentTarget);
            }}
            searchClick={null}
          />
        </ListItem>
        {stores.map((store) => (
          <ListItem>
            <StoreCard
              title={store.name}
              min="10"
              verified={true}
              favorited={true}
              joinClick={null}
              viewClick={null}
              address={store.address}
            ></StoreCard>
          </ListItem>
        ))}
      </List>

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
            <Typography variant="h4">Sort By</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Distance" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={toggleDist}
                checked={distance}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Wait Time" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={toggleWait}
                checked={waitTime}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <Typography variant="h4">Filter</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary="Favourited" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={toggleFav}
                checked={fav}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
