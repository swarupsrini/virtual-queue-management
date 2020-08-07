import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import useInterval from "../../utils/useInterval";
import { REFRESH_INTERVAL, getUserStore } from "../../utils/actions";

import StoreHeader from "../../components/StoreHeader";
import Header from "../../components/Header";

import useStyles from "./styles";

function InfoCard(props) {
  return (
    <div className={props.classes.infoDiv}>
      {props.icon === "shop" ? (
        <ShoppingCartIcon className={props.classes.infoIcon}></ShoppingCartIcon>
      ) : (
        <PeopleAltIcon className={props.classes.infoIcon}></PeopleAltIcon>
      )}

      <p className={props.classes.infoTitle}>{props.title}</p>
      <p className={props.classes.infoSubtitle}>{props.subtitle}</p>
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
        <InfoCard
          classes={classes}
          icon="shop"
          title="45"
          subtitle="In store"
        ></InfoCard>
        <InfoCard
          classes={classes}
          icon="person"
          title="45"
          subtitle="In queue"
        ></InfoCard>
      </div>
    </div>
  );
}
