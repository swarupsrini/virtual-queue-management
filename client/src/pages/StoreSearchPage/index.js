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
import { getAllStores, getDistance } from "../../utils/actions";
import { getCurLocation } from "../../utils/location";
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

function getUserInfo() {
  // Get user info from server
  // code below requires backend call
  return {
    fav: [0, 2],
  };
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
    getCurLocation()
      .then((user) => {
        setUserLoc(user);
        return [new Promise((resolve) => resolve(user)), getAllStores()];
      })
      .then((arr) => Promise.all(arr))
      .then(([user, storeRes]) => [
        new Promise((resolve) => resolve(user)),
        storeRes.json(),
      ])
      .then((arr) => Promise.all(arr))
      .then(([user, storeRes]) => {
        return storeRes.map((store) => {
          return getDistance(user.lat, user.long, store.lat, store.long)
            .then((res) => res.json())
            .then((res) => {
              return { ...store, distance: res.dist };
            });
        });
      })
      .then((storeRes) => Promise.all(storeRes))
      .then((storeRes) => {
        let result = [];
        if (text === "") result = storeRes;
        else {
          storeRes.map((temp) => {
            if (temp.name.toLowerCase().includes(text.toLowerCase())) {
              result.push(temp);
            } else if (temp._id === text) {
              result.push(temp);
            }
          });
        }
        sort(result);
        if (fav) setStores(displayFav(result));
      });
  }, [waitTime, fav, text]);

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
      return a.wait - b.wait;
    });
    return sorted;
  }

  function sortByDist(stores) {
    const sorted = [...stores];
    sorted.sort((a, b) => {
      return a.distance - b.distance;
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
              position={[
                typeof store.lat !== "undefined" && store.lat,
                typeof store.lat !== "undefined" && store.long,
              ]}
              onclick={() => {
                setText(store._id);
              }}
            ></Marker>
          ))}
          {typeof userLoc.lat !== "undefined" &&
            typeof userLoc.long !== "undefined" && (
              <Marker
                key={122121212}
                icon={iconPerson}
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
            searchClick={setText}
            clearClick={() => {
              setText("");
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
