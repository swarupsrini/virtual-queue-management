import React, { useState, useEffect, useRef } from "react";
import StoreHeader from "../../components/StoreHeader";
import DisplayQrPopup from "../../components/DisplayQrPopup";
import Header from "../../components/Header";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { iconPerson, best } from "../StoreSearchPage/icon";
import {
  REFRESH_INTERVAL,
  getStoreIdFromJoinedQueue,
  getStoreById,
  getEventsByStoreId,
  getQueue,
  getForeCastWaitTime,
  exitQueue,
  getFancyQueue,
} from "../../utils/actions";
import useInterval from "../../utils/useInterval";
import { Map, TileLayer, Marker } from "react-leaflet";
import "./index.css";
import { Redirect } from "react-router-dom";

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
  const [storeInfo, setStoreInfo] = useState({
    lat: 0,
    long: 0,
  });
  const [userInfo, setUserInfo] = useState({ id: "ewdw" });
  const [userQueue, setUserQueue] = useState([]);
  const [msg, setMsg] = useState("");
  const [storeSearch, setStoreSearch] = useState(null);
  const [displayQR, setDisplayQR] = useState(false);

  useEffect(() => {
    getStoreIdFromJoinedQueue((store_id) => {
      if (store_id === "exited") {
        setStoreInfo({
          lat: 0,
          long: 0,
        });
        setStoreSearch("/store-search");
      } else {
        getStoreById(store_id, (store) => {
          getEventsByStoreId(store, (store) => {
            getQueue(store, () => {});
            getForeCastWaitTime(store, () => {});
            setStoreInfo(store);
          });
        });
      }
    });
    getFancyQueue((res) => {
      setUserQueue(res);
    });
    setMsg(
      "Please arrive near the entrance, ready with your QR code on the application, Thank You!"
    );
  }, []);

  useInterval(async () => {
    getStoreIdFromJoinedQueue((store_id) => {
      if (store_id === "exited") {
        setStoreInfo({
          lat: 0,
          long: 0,
        });
        setStoreSearch("/store-search");
      } else {
        getStoreById(store_id, (store) => {
          getEventsByStoreId(store, (store) => {
            getQueue(store, () => {});
            getForeCastWaitTime(store, () => {});
            setStoreInfo(store);
          });
        });
      }
    });
    getFancyQueue((res) => {
      setUserQueue(res);
    });
    setMsg(
      "Please arrive near the entrance, ready with your QR code on the application, Thank You!"
    );
  }, REFRESH_INTERVAL);

  useEffect(() => {
    getCurrentLocation(setUserLoc);
  }, []);

  return (
    <div>
      {storeSearch && <Redirect to={storeSearch} />}
      {displayQR && (
        <DisplayQrPopup close={() => setDisplayQR(false)}></DisplayQrPopup>
      )}
      <Header></Header>
      <div className={classes.root}>
        <StoreHeader title={storeInfo.name} subtitle={storeInfo.address} />
        <Button
          size="large"
          className={classes.displayQR}
          color="primary"
          variant="contained"
          onClick={() => {
            setDisplayQR(true);
          }}
        >
          Display QR
        </Button>
        <Button
          size="large"
          className={classes.exitQueue}
          variant="contained"
          onClick={() => {
            exitQueue();
            setStoreSearch("/store-search");
          }}
        >
          Exit Queue
        </Button>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={1}>
            <Grid item>
              <div className={classes.divElem}>
                <p className={classes.typeTitle}>Forecast Wait</p>
                <p className={classes.typeSubtitle2}>
                  {storeInfo.forecast_wait_time}
                </p>
                <p className={classes.typeSubtitle3}> min</p>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.divElem}>
                <p className={classes.typeTitle}>In Queue</p>
                <p className={classes.typeSubtitle}>{storeInfo.in_queue}</p>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.divElem}>
                <p className={classes.typeTitle}>In Store</p>
                <p className={classes.typeSubtitle}>{storeInfo.in_store}</p>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.divElem2}>
                <p className={classes.typeTitle}>Your Position</p>
              </div>
              <Grid container spacing={1} className={classes.positionQueue}>
                {userQueue.map((elem, index) => (
                  <Grid item key={elem.user_id}>
                    {!elem.isUser && (
                      <div className={classes.notUserQueue}>
                        <p className={classes.queueTextNotUser}>
                          {elem.position + 1}
                        </p>
                      </div>
                    )}
                    {elem.isUser && (
                      <div className={classes.userQueue}>
                        <p className={classes.queueTextUser}>
                          {elem.position + 1}
                        </p>
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
            {
              <Marker
                key={122121213}
                position={[storeInfo.lat, storeInfo.long]}
              ></Marker>
            }
          </Map>
        </div>
      </div>
    </div>
  );
}
