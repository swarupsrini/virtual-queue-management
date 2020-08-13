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
import { iconPerson, best } from "./icon";
import { getAllStores } from "../../utils/actions";

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

function getDistance(storeID) {
  // Get distance from current location to the store through external API
  // Code below return mock distances based on store names

  // if (storeName.includes("Walmart")) {
  //   return 20;
  // } else if (storeName.includes("No Frills")) {
  //   return 100;
  // } else {
  //   return 30;
  // }
  return 20;
}

function getUserInfo() {
  // Get user info from server
  // code below requires backend call
  return {
    fav: [0, 2],
  };
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
  const [stores, setStores] = useState([]);

  const [text, setText] = useState("");
  const [number, setNumber] = useState(10);
  const [viewPage, setViewPage] = useState(null);

  const [analyticsPage, setAnalyticsPage] = useState(null);

  useEffect(() => {
    getCurrentLocation(setUserLoc);
  }, [userLoc]);

  useEffect(() => {
    getAllStores((stores) => {
      setStores(stores);
      sort(stores);
      if (fav) setStores(displayFav(stores));
    });
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
      if (favs.includes(stores[i]._id)) {
        result.push(stores[i]);
      }
    }
    return result;
  }

  function markerClicked(store) {
    setText(store._id);
    searchBarText(store._id);
  }

  function searchBarText(query) {
    filter(query);
  }

  function filter(query) {
    let result = [];
    getAllStores((res) => {
      const temp = res;
      if (query === "") result = temp;
      else {
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].name.toLowerCase().includes(query.toLowerCase())) {
            result.push(temp[i]);
          } else if (temp[i]._id === query) {
            result.push(temp[i]);
            break;
          }
        }
      }
      if (fav) {
        result = displayFav(result);
      }
      sort(result);
    });
  }

  return (
    <div className={classes.root}>
      {analyticsPage && <Redirect to={analyticsPage} />}
      {viewPage && <Redirect to={viewPage} />}
      <Header></Header>
      <div className="bigMap">
        <Map
          center={[43.7763, -79.25802]}
          zoom={12}
          zoomControl={false}
          id="main"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stores.slice(0, number).map((store) => (
            <Marker
              key={store._id}
              position={[store.lat, store.long]}
              onclick={() => {
                markerClicked(store);
              }}
            ></Marker>
          ))}
          {typeof userLoc.lat !== "undefined" &&
            typeof userLoc.long !== "undefined" && (
              <Marker
                key={122121212}
                icon={best}
                position={[userLoc.lat, userLoc.long]}
              ></Marker>
            )}
        </Map>
      </div>
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
          <ListItem key={store._id}>
            <StoreCard
              title={store.name}
              min={store.wait}
              dist={store.distance}
              verified={store.verified}
              favorited={Boolean(getUserInfo().fav.includes(store._id))}
              joinClick={() => {
                joinedQueue(store);
                setViewPage("/queue-status");
              }}
              viewClick={() => {
                viewData(store);
                setAnalyticsPage("/store-analytics/" + store._id);
              }}
              updateUserFav={(fav) => updateUserFavStores(store._id, fav)}
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
