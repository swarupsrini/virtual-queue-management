import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import useStyles from "./styles";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
} from "@material-ui/core";
import useInterval from "../../utils/useInterval";
import {
  REFRESH_INTERVAL,
  getUserStore,
  getStoreById,
  getEventsByStoreId,
  getQueue,
  getForeCastWaitTime,
  joinQueue,
} from "../../utils/actions";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import datetime from "date-and-time";
import { Router } from "@material-ui/icons";

function getNumVisitsToday(store) {
  const dayStart = new Date();
  dayStart.setHours(0);
  dayStart.setMinutes(0);
  dayStart.setSeconds(0);

  let num_visits_today = 0;
  while (
    num_visits_today < store.customer_admissions.length &&
    dayStart <
      store.customer_admissions[
        store.customer_admissions.length - num_visits_today - 1
      ].exit_time
  ) {
    num_visits_today += 1;
  }
  return num_visits_today;
}

function getAvgAdmissions(store) {
  const num_admissions = new Array(
    store.close_time.getHours() - store.open_time.getHours()
  ).fill(0);

  let num_days = 0;
  let last_day = 0;
  let last_month = 0;
  let last_year = 0;
  for (let i = 0; i < store.customer_admissions.length; i++) {
    const visit = store.customer_admissions[i].exit_time;
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
  return avg_num_admissions;
}

function getLeastBusyTime(store) {
  const min_num_admissions = Math.min.apply(null, store.avg_num_admissions);
  const least_busy_time =
    store.avg_num_admissions.indexOf(min_num_admissions) +
    store.open_time.getHours();
  return least_busy_time;
}

function getMostBusyTime(store) {
  const max_num_admissions = Math.max.apply(null, store.avg_num_admissions);
  const most_busy_time =
    store.avg_num_admissions.indexOf(max_num_admissions) +
    store.open_time.getHours();
  return most_busy_time;
}

function updateStore(store, setStore) {
  getEventsByStoreId(store, (store) => {
    getQueue(store, () => {});
    console.log(store);
    store.customer_admissions = store.customer_visits.slice(
      0,
      store.customer_visits.length - store.queue.length
    );
    getForeCastWaitTime(store, () => {});
    store.num_visits_today = getNumVisitsToday(store);

    store.avg_num_admissions = getAvgAdmissions(store);
    store.least_busy_time = getLeastBusyTime(store);
    store.most_busy_time = getMostBusyTime(store);
    setStore(store);
  });
}

export default function StoreAnalytics(props) {
  const { store_id } = useParams();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [store, setStore] = useState({
    open_time: datetime.parse("09:00:00 AM", "hh:mm:ss A"),
    close_time: datetime.parse("08:00:00 PM", "hh:mm:ss A"),
    avg_num_admissions: [],
    queue: [],
    customer_visits: [],
  });
  const [viewPage, setViewPage] = useState(null);
  const currentUser = props.currentUser;

  useEffect(() => {
    getStoreById(store_id, (store) => {
      updateStore(store, setStore);
    });
  }, []);

  useInterval(async () => {
    getStoreById(store_id, (store) => {
      updateStore(store, setStore);
    });
  }, REFRESH_INTERVAL);

  return (
    <div className={classes.root}>
      {viewPage && <Redirect to={viewPage} />}
      <Header></Header>
      <StoreHeader title={store.name} subtitle={store.address} />
      <Button
        size="large"
        className={classes.backButton}
        color="primary"
        variant="contained"
        onClick={() => {
          setViewPage("/store-search");
        }}
      >
        Back
      </Button>
      <Button
        size="large"
        className={classes.joinQueueButton}
        color="primary"
        variant="contained"
        onClick={() => {
          joinQueue(store._id);
          setViewPage("/queue-status");
        }}
      >
        Join Queue
      </Button>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item>
            <div className={classes.divElem}>
              <p className={classes.typeTitle}>Forecast Wait</p>
              <p className={classes.typeSubtitle2}>
                {store.forecast_wait_time}
              </p>
              <p className={classes.typeSubtitle3}> min</p>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <p className={classes.typeTitle}>In Queue</p>
              <p className={classes.typeSubtitle}>{store.in_queue}</p>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <p className={classes.typeTitle}>In Store</p>
              <p className={classes.typeSubtitle}>{store.in_store}</p>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <p className={classes.typeTitle}>Visits today</p>
              <p className={classes.typeSubtitle}>{store.num_visits_today}</p>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <p className={classes.typeTitle}>Least busy time</p>
              <p className={classes.typeSubtitle2}>
                {store.least_busy_time % 12}
              </p>
              <p className={classes.typeSubtitle3}>
                {store.least_busy_time < 12 ? "am" : "pm"}
              </p>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem2}>
              <p className={classes.typeTitle}>Most busy time</p>
              <p className={classes.typeSubtitle2}>
                {store.most_busy_time % 12}
              </p>
              <p className={classes.typeSubtitle3}>
                {store.most_busy_time < 12 ? "am" : "pm"}
              </p>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div className={classes.linegraph}>
        <LineGraph
          yValues={store.avg_num_admissions}
          startTime={store.open_time.getHours()}
        />
      </div>
    </div>
  );
}
