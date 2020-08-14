import React, { useState, useEffect } from "react";
import StoreHeader from "../../components/StoreHeader";
import Header from "../../components/Header";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { iconPerson, best } from "../StoreSearchPage/icon";
import { REFRESH_INTERVAL, getUserStore } from "../../utils/actions";
import useInterval from "../../utils/useInterval";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./index.css";

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

function getQueueInfo(callback) {
  callback(["ewdw", "gegre", "fwqwwqs", "dqdqs", "gete"]);
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
  const [userInfo, setUserInfo] = useState({ id: "ewdw" });
  const [userQueue, setUserQueue] = useState([]);
  const [msg, setMsg] = useState("");

  useInterval(async () => {
    getUserStore(
      () => {},
      () => {}
    );
    getQueueInfo(setUserQueue);
    setMsg(
      "Please arrive near the entrance, ready with your QR code on the application, Thank You!"
    );
  }, 0);

  useEffect(() => {
    getCurrentLocation(setUserLoc);
  }, []);

  return (
    <div>
      <Header></Header>
      <div className={classes.root}>
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
          <Grid container spacing={1}>
            <Grid item>
              <div className={classes.divElem}>
                <p className={classes.typeTitle}>Forecast Wait</p>
                <p className={classes.typeSubtitle2}>45</p>
                <p className={classes.typeSubtitle3}> min</p>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.divElem}>
                <p className={classes.typeTitle}>In Queue</p>
                <p className={classes.typeSubtitle}>20</p>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.divElem}>
                <p className={classes.typeTitle}>In Store</p>
                <p className={classes.typeSubtitle}>45</p>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.divElem2}>
                <p className={classes.typeTitle}>Your Position</p>
              </div>
              <Grid container spacing={1} className={classes.positionQueue}>
                {userQueue.map((elem, index) => (
                  <Grid item key={elem}>
                    {userInfo.id !== elem && (
                      <div className={classes.notUserQueue}>
                        <p className={classes.queueTextNotUser}>{index}</p>
                      </div>
                    )}
                    {userInfo.id === elem && (
                      <div className={classes.userQueue}>
                        <p className={classes.queueTextUser}>{index}</p>
                        <p className={classes.queueTextUser2}>You</p>
                      </div>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper2}>
          <Typography variant="h6" className={classes.message}>
            Message from store:
          </Typography>
          <Typography variant="h6" className={classes.storeMsg}>
            {msg}
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
                  icon={iconPerson}
                  position={[userLoc.lat, userLoc.long]}
                ></Marker>
              )}
            {<Marker key={122121213} position={getStoreLatLong()}></Marker>}
          </Map>
        </div>
      </div>
    </div>
  );
}
