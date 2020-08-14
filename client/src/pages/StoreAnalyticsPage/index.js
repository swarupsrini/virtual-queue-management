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

export default function StoreAnalytics(props) {
  const classes = useStyles();
  const [user, setUser] = useState({})
  const [store, setStore] = useState(
    {
      open_time:new Date(0,0,0,3),
      avg_num_admissions:[],
    }
  )
  const [viewPage, setViewPage] = useState(null);

  useEffect(() => {
    getUserStore(setUser, setStore);
  }, []);
  
  useInterval(async () => {
    getUserStore(setUser, setStore)
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
