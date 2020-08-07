import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import StoreCard from "../../components/StoreCard";
import { Redirect } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Switch,
  ListItemText,
  Typography,
  TextField,
} from "@material-ui/core";
import Search from "../../components/Search";
import Popover from "@material-ui/core/Popover";
import Header from "../../components/Header";
import useStyles from "./styles";
import "./index.css";
import { blueDot } from "./icon";

const STORE_SHOW_LIMIT = 20;

function joinedQueue(storeInfo) {
  // there will be a backend call to update user's queue status
}
function viewData(storeInfo) {
  // there will be a backend call to update user's currrently "viewing" store
}
function updateUserFavStores(storeID, value) {
  // there will be a backend call to update user's favourited stores
}

function getDistance(storeName) {
  // Get distance from current location to the store through external API
  // Code below return mock distances based on store names

  if (storeName.includes("Walmart")) {
    return 20;
  } else if (storeName.includes("No Frills")) {
    return 100;
  } else {
    return 30;
  }
}

function getUserInfo() {
  // Get user info from server
  // code below requires backend call
  return {
    fav: [0, 2],
  };
}

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
      address: "3850 Sheppard Ave E, Scarborough, ON M1T 3L3",
      latitude: 43.7843507,
      longitude: -79.2933375,
      wait: 100,
      ID: 4,
      isVerified: false,
    },
  ];
}

function getPosition() {
  return new Promise((res) => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        res(result.coords);
      },
      () => {},
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
}

function getCurrentLocation(callback) {
  return getPosition().then((coords) => {
    callback({ lat: coords.latitude, long: coords.longitude });
  });
}
export default function StoreSearchPage() {
  const classes = useStyles();
  const [waitTime, setWait] = useState(false);
  const [userLoc, setUserLoc] = useState({});

  const [fav, setFav] = useState(false);

  const [anchor, setAnchor] = useState(null);
  const [stores, setStores] = useState(sortByDist(getStores()));

  const [text, setText] = useState("");
  const [number, setNumber] = useState(10);
  const [viewPage, setViewPage] = useState(null);

  const [analyticsPage, setAnalyticsPage] = useState(null);

  useEffect(() => {
    getCurrentLocation(setUserLoc);
  }, []);

  useEffect(() => {
    sort(getStores());
    if (fav) setStores(displayFav(stores));
  }, [waitTime, fav]);

  function toggleWait() {
    setWait((prev) => !prev);
  }

  function toggleFav() {
    setFav((prev) => !prev);
  }

  function sort(stores) {
    if (waitTime) {
      setStores(sortByWait(stores));
    } else {
      setStores(sortByDist(stores));
    }
  }

  function sortByWait(stores) {
    const sorted = [...stores];
    sorted.sort((a, b) => {
      if (a.wait < b.wait) {
        return -1;
      }
    });
    return sorted;
  }

  function sortByDist(stores) {
    const sorted = [...stores];
    for (let i = 0; i < sorted.length; i++) {
      sorted[i].distance = getDistance(sorted[i].name);
    }
    sorted.sort((a, b) => {
      if (a.distance < b.distance) {
        return -1;
      }
    });
    return sorted;
  }

  function displayFav(stores) {
    const result = [];
    const favs = getUserInfo().fav;
    for (let i = 0; i < stores.length; i++) {
      if (favs.includes(stores[i].ID)) {
        result.push(stores[i]);
      }
    }
    return result;
  }

  function markerClicked(store) {
    setText(store.ID);
    searchBarText(store.ID);
  }

  function searchBarText(query) {
    const filteredResult = filter(query);
    sort(filteredResult);
  }

  function filter(query) {
    let result = [];
    const temp = getStores();
    console.log(userLoc);

    if (query === "") result = temp;
    else {
      for (let i = 0; i < temp.length; i++) {
        if (isNaN(query)) {
          if (temp[i].name.toLowerCase().includes(query.toLowerCase())) {
            result.push(temp[i]);
          }
        } else if (temp[i].ID === parseInt(query)) {
          result.push(temp[i]);
          break;
        }
      }
    }
    if (fav) {
      result = displayFav(result);
    }
    return result;
  }

  return (
    <div className={classes.root}>
      {analyticsPage && <Redirect to={analyticsPage} />}
      {viewPage && <Redirect to={viewPage} />}
      <Header></Header>
      <Map center={[43.7763, -79.25802]} zoom={12} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stores.slice(0, number).map((store) => (
          <Marker
            key={store.ID}
            position={[store.latitude, store.longitude]}
            onclick={() => {
              markerClicked(store);
            }}
          ></Marker>
        ))}
        {typeof userLoc.lat !== "undefined" &&
          typeof userLoc.long !== "undefined" && (
            <Marker
              key={122121212}
              icon={blueDot}
              position={[userLoc.lat, userLoc.long]}
            ></Marker>
          )}
      </Map>
      <List className={classes.leftOverlay}>
        <ListItem>
          <Search
            filterClick={(e) => {
              setAnchor(e.currentTarget);
            }}
            searchClick={searchBarText}
            clearClick={() => {
              setText("");
              searchBarText("");
            }}
            onChangedSync={(e) => setText(e)}
            text={text}
          />
        </ListItem>
        {stores.slice(0, number).map((store) => (
          <ListItem key={store.ID}>
            <StoreCard
              title={store.name}
              min={store.wait}
              dist={getDistance(store.name)}
              verified={store.isVerified}
              favorited={Boolean(getUserInfo().fav.includes(store.ID))}
              joinClick={() => {
                joinedQueue(store);
                setViewPage("/queue-status");
              }}
              viewClick={() => {
                viewData(store);
                setAnalyticsPage("/store-analytics/" + store.ID);
              }}
              updateUserFav={(fav) => updateUserFavStores(store.ID, fav)}
              address={store.address}
            ></StoreCard>
          </ListItem>
        ))}
      </List>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
      >
        <List className={classes.popup}>
          <ListItem>
            <Typography variant="h4">Sort By</Typography>
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
          <ListItem>
            <Typography variant="h4">Stores to Show</Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary={`Number (max: ${STORE_SHOW_LIMIT})`} />
            <ListItemSecondaryAction>
              <TextField
                className={classes.input}
                value={number}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  if (
                    !isNaN(e.target.value) &&
                    parseInt(e.target.value) <= STORE_SHOW_LIMIT &&
                    parseInt(e.target.value) > 0
                  ) {
                    setNumber(e.target.value);
                  }
                }}
              ></TextField>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
