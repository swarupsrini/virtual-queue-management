import { useState, useEffect } from "react";
import StoreHeader from "../../components/StoreHeader";
import Header from "../../components/Header";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "./styles";
import React from "react";
import { REFRESH_INTERVAL, getUserStore } from "../../utils/actions";
import useInterval from "../../utils/useInterval";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./index.css";
import { blueDot } from "../StoreSearchPage/icon";

function getStoreLatLong() {
  return [43.7763, -79.25802];
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

export default function QueueStatus(props) {
  const classes = useStyles();

  const [userLoc, setUserLoc] = useState({});
  const [storeInfo, setStoreInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useInterval(async () => {
    getUserStore(setUserInfo, setStoreInfo);
  }, REFRESH_INTERVAL);

  useEffect(() => {
    getCurrentLocation(setUserLoc);
  }, []);

  return (
    <div>
      <Header></Header>
      <div className={classes.storeHeaderMargin}></div>
      <StoreHeader
        title="Walmart"
        subtitle="300 Borough Dr Unit 3635,  Scarborough, ON M1P 4P5"
      />
      <Button
        size="large"
        className={classes.displayQR}
        color="primary"
        variant="contained"
        onClick={() => {}}
      >
        Display QR
      </Button>
      <Button
        size="large"
        className={classes.exitQueue}
        variant="contained"
        onClick={() => {}}
      >
        Exit Queue
      </Button>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={1} className={classes.gridContainer}>
          <Grid item>
            <div className={classes.divElem}>
              <Typography variant="h6">Forecast Wait</Typography>
              <Typography variant="h2" className={classes.typeSubtitle}>
                45
              </Typography>
              <Typography variant="h5" className={classes.typeSubtitle}>
                min
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <Typography variant="h6">In Queue</Typography>
              <Typography variant="h2" className={classes.typeSubtitle}>
                45
              </Typography>
              <Typography
                variant="h5"
                className={classes.typeSubtitle}
              ></Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <Typography variant="h6">In Store</Typography>
              <Typography variant="h2" className={classes.typeSubtitle}>
                45
              </Typography>
              <Typography
                variant="h5"
                className={classes.typeSubtitle}
              ></Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper2}>
        <Typography variant="h5" className={classes.message}>
          Message from store:
        </Typography>
        <Typography variant="body1" className={classes.storeMsg}>
          Actual Message from store
        </Typography>
      </Paper>
      <div className="miniMap">
        <Map center={[43.7763, -79.25802]} zoom={12} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {typeof userLoc.lat !== "undefined" &&
            typeof userLoc.long !== "undefined" && (
              <Marker
                key={122121212}
                icon={blueDot}
                position={[userLoc.lat, userLoc.long]}
              ></Marker>
            )}
          {<Marker key={122121213} position={getStoreLatLong()}></Marker>}
        </Map>
      </div>
    </div>
  );
}
