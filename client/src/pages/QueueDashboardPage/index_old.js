import React, { useState } from "react";
import StoreHeader from "../../components/StoreHeader";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Header from "../../components/Header";
import useStyles from "./styles";

function getStoreName(storeId) {
  return "Walmart";
}
function getStoreSmallAdd(storeId) {
  return "300 Borough Dr Unit 3635";
}
function getStoreBigAdd(storeId) {
  return "Scarborough, ON M1P 4P5";
}

export default function QueueDashboard(props) {
  const classes = useStyles();

  const [queueOpen, setQueueOpen] = useState(true);
  const [storeCount, setStoreCount] = useState(0);
  const [queue, setQueue] = useState([2, 1, 1, 3]);

  const storeId = 0;
  const storeName = getStoreName(storeId);
  const smallAddress = getStoreSmallAdd(storeId);
  const bigAddress = getStoreBigAdd(storeId);

  let nextGroupSize;
  if (queue.length > 0) {
    nextGroupSize = queue[0];
  } else {
    nextGroupSize = 0;
  }

  let closeOpenQueueText;
  let inOutButtons;
  if (queueOpen) {
    closeOpenQueueText = "Close Queue";
    inOutButtons = (
      <Grid className={classes.inOutButtons} container>
        <Button
          className={classes.inButton}
          variant="contained"
          onClick={() => {
            if (queue.length > 0) {
              setStoreCount(storeCount + nextGroupSize);
              queue.shift();
            }
          }}
        >
          IN
        </Button>
        <Button
          className={classes.outButton}
          variant="contained"
          onClick={() => {
            if (storeCount > 0) {
              setStoreCount(storeCount - 1);
            }
          }}
        >
          OUT
        </Button>
      </Grid>
    );
  } else {
    closeOpenQueueText = "Open Queue";
  }

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
            subtitle1={smallAddress}
            subtitle2={bigAddress}
          />
        </div>
        <Grid className={classes.datacards} container>
          <DataCard title={storeCount} subtitle="In-Store"></DataCard>
          <DataCard title={queue.length} subtitle="In Queue"></DataCard>
          <DataCard title={nextGroupSize} subtitle="Next"></DataCard>
        </Grid>
        <Grid className={classes.queueButtons} container>
          <Button
            color="default"
            variant="contained"
            onClick={(e) => {
              setQueueOpen(!queueOpen);
            }}
          >
            {closeOpenQueueText}
          </Button>
          <Button
            color="default"
            variant="contained"
            onClick={() => {
              setQueue([]);
            }}
          >
            Clear Queue
          </Button>
          <Button
            color="default"
            variant="contained"
            onClick={() => {
              console.log("scan");
            }}
          >
            Scan QR
          </Button>
        </Grid>
        {inOutButtons}
      </Frame>
    </div>
  );
}
