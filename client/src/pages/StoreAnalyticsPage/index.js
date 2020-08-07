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
      <div className={classes.header}>
        <StoreHeader
          title={storeName}
          subtitle1={smallAddress + ", " + bigAddress}
        />
      </div>
      <div className={classes.frame}>
        <Grid className={classes.datacards} container>
          <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
          <div className={classes.line}></div>
          <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
          <div className={classes.line}></div>
          <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
          <div className={classes.line}></div>
          <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
          <div className={classes.line}></div>
          <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
          <div className={classes.line}></div>
          <DataCard title="Forecast wait" number="45" suffix="min"></DataCard>
        </Grid>
      </div>
      <div className={classes.linegraph}>
        <LineGraph yValues={storeTraffic} startTime={storeOpenTime} />
      </div>
    </div>
  );
}
