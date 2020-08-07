import React from "react";
import StoreHeader from "../../components/StoreHeader";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import defaultQRCode from "../../images/qrcode.png";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

export default function QueueStatus(props) {
  const classes = useStyles();

  return (
    <div>
      <Header></Header>
      <div className={classes.storeHeaderMargin}></div>
      <StoreHeader
        title={"Walmart"}
        subtitle1={"300 Borough Dr Unit 3635,  Scarborough, ON M1P 4P5"}
      />
      <Button
        className={classes.displayQR}
        color="primary"
        variant="contained"
        onClick={() => {}}
      >
        Display QR
      </Button>
      <Button
        className={classes.exitQueue}
        variant="contained"
        onClick={() => {}}
      >
        Exit Queue
      </Button>
    </div>
  );
}
