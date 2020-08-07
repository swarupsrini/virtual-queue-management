import React from "react";
import StoreHeader from "../../components/StoreHeader";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import defaultQRCode from "../../images/qrcode.png";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
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
        size="large"
        className={classes.displayQR}
        color="primary"
        variant="contained"
        onClick={() => {}}
      >
        Display QR
      </Button>
      <Button
        size="large"
        className={classes.exitQueue}
        variant="contained"
        onClick={() => {}}
      >
        Exit Queue
      </Button>
      <Paper className={classes.paper}>
        <Grid container spacing={1} className={classes.gridContainer}>
          <Grid item>
            <div className={classes.divElem}>
              <Typography variant="h6">Forecast Wait</Typography>
              <Typography variant="h2" className={classes.typeSubtitle}>
                45
              </Typography>
              <Typography variant="h5" className={classes.typeSubtitle}>
                min
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <Typography variant="h6">In Queue</Typography>
              <Typography variant="h2" className={classes.typeSubtitle}>
                45
              </Typography>
              <Typography
                variant="h5"
                className={classes.typeSubtitle}
              ></Typography>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.divElem}>
              <Typography variant="h6">In Store</Typography>
              <Typography variant="h2" className={classes.typeSubtitle}>
                45
              </Typography>
              <Typography
                variant="h5"
                className={classes.typeSubtitle}
              ></Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper2}>
        <Typography variant="h6" className={classes.message}>
          Message from store:{" "}
        </Typography>
      </Paper>
    </div>
  );
}
