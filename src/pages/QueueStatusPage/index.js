import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StoreHeader from "../../components/StoreHeader";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import defaultQRCode from "../../images/qrcode.png";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  datacard: {
    marginTop: "20px",
    marginLeft: "20px",
  },
  datacards: {
    marginTop: "20px",
    justifyContent: "space-around",
  },
  frame: {
    marginBottom: "60px",
  },
  header: {
    marginTop: "20px",
    marginBottom: "30px",
  },
  queueButtons: {
    marginTop: "20px",
    justifyContent: "space-around",
  },
  inOutButtons: {
    marginTop: "20px",
    justifyContent: "space-around",
  },
  qrcode: {
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "200px",
  },
  exitQueue: {
    marginBottom: "20px",
    textAlign: "center",
  },
});

function getQueue(storeId) {
  return [2, 1, 1, 3];
}
function getCurPosition(userId) {
  return 2;
}
function getCurId(userId) {
  return 45;
}
function getQRCode(userId) {
  return defaultQRCode;
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

export default function QueueStatus(props) {
  const classes = useStyles();
  /*
  const [queue] = useState([2,1,1,3]);
  const [curPosition] = useState(2);
  const [curID] = useState(45);
  const [storeName] = useState("Walmart");
  const [smallAddress] = useState("300 Borough Dr Unit 3635,");
  const [bigAddress] = useState("Scarborough, ON M1P 4P5");
  const [qrCode] = useState(defaultQRCode);*/

  const storeId = 0;
  const userId = 0;
  const queue = getQueue(storeId);
  const curPosition = getCurPosition(userId);
  const curID = getCurId(userId);
  const storeName = getStoreName(storeId);
  const smallAddress = getStoreSmallAdd(storeId);
  const bigAddress = getStoreBigAdd(storeId);
  const qrCode = getQRCode(userId);

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
          <DataCard title={queue.length} subtitle="In Queue"></DataCard>
          <DataCard title={curID} subtitle="My ID"></DataCard>
          <DataCard title={curPosition} subtitle="Position"></DataCard>
        </Grid>
        <img src={qrCode} className={classes.qrcode}></img>
        <div className={classes.exitQueue}>
          <Link to="/store-search">
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                queue.splice(curPosition, 1);
              }}
            >
              "Exit Queue"
            </Button>
          </Link>
        </div>
      </Frame>
    </div>
  );
}
