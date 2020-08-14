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
import { REFRESH_INTERVAL,getUserStore, getQueue, getForeCastWaitTime, getAllStores } from "../../utils/actions";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import datetime from "date-and-time";

function getNumVisitsToday (store) {
  const dayStart = new Date();
  dayStart.setHours(0);
  dayStart.setMinutes(0);
  dayStart.setSeconds(0);

  let num_visits_today = 0;
  while (
    num_visits_today + store.queue.length < store.customer_visits.length &&
    dayStart <
      store.customer_visits[num_visits_today + store.queue.length].exit_time
  ) {
    num_visits_today += 1;
  }
  return num_visits_today;
};

function getAvgAdmissions (store)  {
  const num_admissions = new Array(
    store.close_time.getHours() - store.open_time.getHours()
  ).fill(0);

  let num_days = 0;
  let last_day = 0;
  let last_month = 0;
  let last_year = 0;
  for (let i = store.queue.length; i < store.customer_visits.length; i++) {
    const visit = store.customer_visits[i].exit_time;

    if (
      visit.getDay() != last_day ||
      visit.getMonth() != last_month ||
      visit.getYear() != last_year
    ) {
      last_day = visit.getDay();
      last_month = visit.getMonth();
      last_year = visit.getYear();
      num_days += 1;
    }
    num_admissions[visit.getHours() - store.open_time.getHours()] += 1;
  }
  const avg_num_admissions = num_admissions.map((n) => n / num_days);
  return avg_num_admissions
};

function getLeastBusyTime (store) {
  const min_num_admissions = Math.min.apply(null, store.avg_num_admissions);
  const least_busy_time =
    store.avg_num_admissions.indexOf(min_num_admissions) +
    store.open_time.getHours();
  return least_busy_time
};

function getMostBusyTime (store) {
  const max_num_admissions = Math.max.apply(null, store.avg_num_admissions);
  const most_busy_time =
    store.avg_num_admissions.indexOf(max_num_admissions) +
    store.open_time.getHours();
  return most_busy_time
};

function updateStore (store) {
  store.num_visits_today = getNumVisitsToday(store);
  store.avg_num_admissions = getAvgAdmissions(store);
  store.least_busy_time = getLeastBusyTime(store);
  store.most_busy_time = getMostBusyTime(store);
}

export default function StoreAnalytics(props) {
  const classes = useStyles();
  const [user, setUser] = useState({})
  const [store, setStore] = useState(
    {
      open_time: datetime.parse("09:00:00 AM", "hh:mm:ss A"),
      close_time: datetime.parse("08:00:00 PM", "hh:mm:ss A"),
      avg_num_admissions:[],
      queue:[],
      customer_visits:[]
    }
  )
  const [viewPage, setViewPage] = useState(null);

  //datetime.format(reservation.time, datetime.compile("MMM D YYYY, h:mm aa"))
  //const a = datetime.parse("09:00:00 AM", "hh:mm:ss A");
  //console.log(a.getHours())

  useEffect(() => {
    getUserStore(setUser, (store) => {
      updateStore(store)
      setStore(store)
    });
    
  }, []);
  
  useInterval(async () => {
    getUserStore(setUser, (store) => {
      updateStore(store)
      setStore(store)
    });
    console.log(getAllStores())
  }, REFRESH_INTERVAL);

  return (
    <div className={classes.root}>
      {viewPage && <Redirect to={viewPage} />}
      <Header></Header>
      <StoreHeader
          title={store.name}
          subtitle={store.address}
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
            <DataCard title="Least busy time" number={store.least_busy_time%12} suffix={(store.least_busy_time < 12) ? "am" : "pm"}></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Most busy time" number={store.most_busy_time%12} suffix={(store.most_busy_time < 12) ? "am" : "pm"}></DataCard>
          </Grid>
          <div style={{width:"4px"}}></div>
        </Grid>
      </div>
      <div className={classes.linegraph}>
        <LineGraph yValues={store.avg_num_admissions} startTime={store.open_time.getHours()} />
      </div>
    </div>
  );
}
