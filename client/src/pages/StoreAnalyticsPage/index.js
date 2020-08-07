import React from "react";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import useStyles from "./styles";
import { Card, CardContent, Typography, Paper } from "@material-ui/core";

function getQueue(storeId) {
  return [2, 1, 1, 3];
}
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
function getStoreSmallAdd(storeId) {
  return "300 Borough Dr Unit 3635";
}
function getStoreBigAdd(storeId) {
  return "Scarborough, ON M1P 4P5";
}

export default function StoreAnalytics(props) {
  const classes = useStyles();

  const storeId = 0;
  const queue = getQueue(storeId);
  const storeCount = getStoreCount(storeId);
  const avgShoppingLength = getAvgShoppingLength(storeId);
  const storeCapacity = getStoreCapacity(storeId);
  const storeOpenTime = getStoreOpenTime(storeId);
  const storeTraffic = getStoreTraffic(storeId);
  const storeName = getStoreName(storeId);
  const smallAddress = getStoreSmallAdd(storeId);
  const bigAddress = getStoreBigAdd(storeId);

  return (
    <div>
      <Header></Header>
      <StoreHeader
          title={storeName}
          subtitle1={smallAddress + ", " + bigAddress}
        />
      <Grid className={classes.datacards} container></Grid>
      <div className={classes.frame}>
        <Grid className={classes.datacards} container spacing={6} >
          <div style={{width:"4px"}}></div>
          <Grid item>
            <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="In queue" number="45" suffix=""></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="In store" number="20" suffix=""></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Visits today" number="104" suffix="min"></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Best time" number="10" suffix="am"></DataCard>
          </Grid>
          <div className={classes.line}></div>
          <Grid item>
            <DataCard title="Worst time" number="10" suffix="am"></DataCard>
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
