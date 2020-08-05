import React from "react";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";
import useStyles from "./styles";

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
      <Frame
        className={classes.frame}
        size={300}
        center
        width={904}
        height="auto"
        background={"#FFFFFF"}
        shadow="1px 1px 3px 2px grey"
        radius={8}
      >
        <div className={classes.header}>
          <StoreHeader
            title={storeName}
            subtitle1={smallAddress + ", " + bigAddress}
          />
        </div>
        <Grid className={classes.datacards} container>
          <DataCard title={queue.length} subtitle="In queue"></DataCard>
          <DataCard
            title={
              Math.round((avgShoppingLength * queue.length) / storeCapacity) +
              " min"
            }
            subtitle="Estimated Wait Time"
          ></DataCard>
          <DataCard title={storeCount} subtitle="In-Store"></DataCard>
        </Grid>
        <div className={classes.linegraph}>
          <LineGraph yValues={storeTraffic} startTime={storeOpenTime} />
        </div>
      </Frame>
    </div>
  );
}
