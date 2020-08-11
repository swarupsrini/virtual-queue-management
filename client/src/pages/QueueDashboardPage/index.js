import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import useInterval from "../../utils/useInterval";
import {
  REFRESH_INTERVAL,
  getUserStore,
  deactivateQueueCall,
  emptyQueueCall,
  customerExitedCall,
} from "../../utils/actions";

import StoreHeader from "../../components/StoreHeader";
import Header from "../../components/Header";

import useStyles from "./styles";
import { NavLink } from "react-router-dom";

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

function Button(props) {
  const classes = useStyles();

  return (
    <div
      className={`${props.className} ${classes.btnDiv}`}
      onClick={props.onClick}
    >
      <p className={classes.btnP}>{props.text}</p>
    </div>
  );
}

export default function QueueDashboard(props) {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [store, setStore] = useState({});

  useEffect(() => {
    getUserStore(setUser, setStore);
  }, []);

  useInterval(async () => {
    getUserStore(setUser, setStore);
  }, REFRESH_INTERVAL);

  const getStoreId = () => store.id;
  const getStoreName = () => store.name;
  const getStoreAddress = () => store.address;
  const getStoreInQueue = () => store.inQueue;
  const getStoreInStore = () => store.inStore;
  const deactivateQueue = () => deactivateQueueCall(store, setStore);
  const emptyQueue = () => emptyQueueCall(setStore);
  const customerExited = () => customerExitedCall(setStore);

  return (
    <div>
      <Header />
      <div className={classes.root}>
        <StoreHeader
          title={getStoreName()}
          subtitle={getStoreAddress()}
        ></StoreHeader>
        <div className={classes.topRightDiv}>
          <InfoCard
            classes={classes}
            icon="shop"
            title={getStoreInStore()}
            subtitle="In store"
          ></InfoCard>
          <InfoCard
            classes={classes}
            icon="person"
            title={getStoreInQueue()}
            subtitle="In queue"
          ></InfoCard>
          <table>
            <td>
              <NavLink to={`/store-analytics/${getStoreId()}`}>
                <Button
                  className={classes.btnStoreAnalytics}
                  text="Store Analytics"
                />
              </NavLink>
            </td>
            <td>
              <tr>
                <Button
                  className={classes.btnDeactivateQueue}
                  onClick={deactivateQueue}
                  text="Deactivate Queue"
                />
              </tr>
              <tr>
                <Button
                  className={classes.btnEmptyQueue}
                  onClick={emptyQueue}
                  text="Empty Queue"
                />
              </tr>
            </td>
          </table>
          <Button
            className={classes.btnCustomerExited}
            onClick={customerExited}
            text="Customer Exited"
          />
        </div>
        <p className={classes.sectionTitle}>Recently Accepted</p>
      </div>
    </div>
  );
}
