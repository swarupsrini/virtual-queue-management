import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import useInterval from "../../utils/useInterval";
import { REFRESH_INTERVAL, getUserStore } from "../../utils/actions";

import StoreHeader from "../../components/StoreHeader";
import Header from "../../components/Header";

import useStyles from "./styles";

function InfoCard(props) {
  return (
    <div className={props.classes.infoDiv}>
      <ShoppingCartIcon htmlColor="white"></ShoppingCartIcon>
    </div>
  );
}

export default function QueueDashboard(props) {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [store, setStore] = useState({});
  useInterval(async () => {
    getUserStore(setUser, setStore);
  }, REFRESH_INTERVAL);

  return (
    <div>
      <Header></Header>
      <StoreHeader
        title="Walmart"
        subtitle="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5"
      ></StoreHeader>
      <div className={classes.topRightDiv}>
        <InfoCard classes={classes}></InfoCard>
      </div>
    </div>
  );
}
