import React, { useState, useEffect } from "react";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import useStyles from "./styles";
import { Button, Card, CardContent, Typography, Paper } from "@material-ui/core";
import useInterval from "../../utils/useInterval";
import { REFRESH_INTERVAL,getUserStore, getNumVisitsToday, getAvgAdmissions, getLeastBusyTime, getMostBusyTime, getQueue, getForeCastWaitTime, updateStore } from "../../utils/actions";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

let num_visits_today = 0

function getStoreCount(storeId) {
  return 0;
}
function getAvgShoppingLength(storeId) {
  return 10;
}
function getStoreCapacity(storeId) {
  return 30;
}
function getStoreOpenTime(storeId) {
  return 8;
}
function getStoreTraffic(storeId) {
  return [8, 8, 8, 15, 30, 30, 28, 25, 33, 18, 10, 10, 5];
}
function getStoreName(storeId) {
  return "Walmart";
}
function getStoreAdd(storeId) {
  return "300 Borough Dr Unit 3635 Scarborough, ON M1P 4P5";
}

function updateNumVisitsToday(setUser, setStore){
  /*
  getUserStore(setUser, setStore).then((store) => {
    const dayStart = new Date()
    dayStart.setHours(0)
    dayStart.setMinutes(0)
    dayStart.setSeconds(0)

    let num_visits_today = 0
    while(num_visits_today < store.customer_visits.length &&
      dayStart < store.customer_visits[num_visits_today].time_of_entry){
      num_visits_today+=1
    }
    store.num_visits_today = num_visits_today
    setStore(store)
  })*/
}

export default function StoreAnalytics(props) {
  const classes = useStyles();
  const [user, setUser] = useState({})
  const [store, setStore] = useState(
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      in_store: 54,
      in_queue:1,
      open_time:3,//new Date(0,0,0,3),
      close_time:10,//new Date(0,0,0,10),
      num_visits_today:0,
      least_busy_time: 7,
      queue:[],
      forecast_wait_time:3,
      customer_visits: [
        {user_id: "1001", exit_time: ""},
        {user_id: "1001", exit_time: ""},
        {user_id: "1001", exit_time: ""},
        {user_id: "1001", exit_time: new Date(2020,7,12,5)},
        {user_id: "1001", exit_time: new Date(2020,7,12,4)},
        {user_id: "1001", exit_time: new Date(2020,7,11,4)},
      ]
    }
  )
  const [viewPage, setViewPage] = useState(null);

  const storeId = 0;
  const storeCount = getStoreCount(storeId);
  const avgShoppingLength = getAvgShoppingLength(storeId);
  const storeCapacity = getStoreCapacity(storeId);
  const storeOpenTime = getStoreOpenTime(storeId);
  const storeTraffic = getStoreTraffic(storeId);
  const storeName = getStoreName(storeId);
  const address = getStoreAdd(storeId);

  useInterval(async () => {
    getUserStore(setUser, setStore)
    updateStore(store,setStore)
    console.log(store)
  }, REFRESH_INTERVAL);

  return (
    <div className={classes.root}>
      {viewPage && <Redirect to={viewPage} />}
      <Header></Header>
      <StoreHeader
          title={storeName}
          subtitle={address}
        />
      <Button
        size="large"
        className={classes.backButton}
        color="primary"
        variant="contained"
        onClick={()=>{setViewPage("/store-search")}}
      >
        Back
      </Button>
      <Button
        size="large"
        className={classes.joinQueueButton}
        color="primary"
        variant="contained"
        onClick={()=>{setViewPage("/queue-status")}}
      >
        Join Queue
      </Button>
      <div className={classes.frame}>
        <Grid className={classes.datacards} container spacing={6} >
          <div style={{width:"4px"}}></div>
          <Grid item>
            <DataCard title="Forecast wait" number={store.forecast_wait_time} suffix="min"></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="In queue" number={store.in_queue} suffix=""></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="In store" number={store.in_store} suffix=""></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Visits today" number={store.num_visits_today} suffix=""></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Least busy time" number={store.least_busy_time} suffix="am"></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Most busy time" number={store.most_busy_time} suffix="am"></DataCard>
          </Grid>
          <div style={{width:"4px"}}></div>
        </Grid>
      </div>
      <div className={classes.linegraph}>
        <LineGraph yValues={storeTraffic} startTime={storeOpenTime} />
      </div>
    </div>
  );
}
