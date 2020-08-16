import datetime from "date-and-time";

import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import useInterval from "../../utils/useInterval";
import {
  REFRESH_INTERVAL,
  getUserStore,
  deactivateQueueCall,
  customerChangedCall,
  getQueue,
  getEventsByStoreId,
  updateEvent,
} from "../../utils/actions";

import StoreHeader from "../../components/StoreHeader";
import Header from "../../components/Header";

import useStyles from "./styles";
import { NavLink } from "react-router-dom";
import QrPopup from "../../components/QrPopup";
import AnnouncementPopup from "../../components/AnnouncementPopup";
import StoreDnePopup from "../../components/StoreDnePopup";

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

  const [showQr, setShowQr] = useState(false);
  const [qrData, setQrData] = useState();
  const [showAnn, setShowAnn] = useState(false);

  const [user, setUser] = useState({});
  const [store, setStore] = useState({ queue: [] });

  const [recent, setRecent] = useState({});

  const updateQueue = () => {
    getUserStore(setUser, (store) => {
      getEventsByStoreId(store, (store) => {
        getQueue(store, setStore);
      });
    });
  };
  useEffect(() => updateQueue(), []);
  useInterval(async () => updateQueue(), REFRESH_INTERVAL);

  // for testing
  useEffect(() => {
    // console.log("store changed:", JSON.stringify(store));
  }, [store]);

  const getStoreId = () => store._id;
  const getStoreName = () => store.name;
  const getStoreAddress = () => store.address;
  const getStoreInQueue = () => (store.queue ? store.queue.length : 0);
  const getStoreInStore = () => store.in_store;
  const deactivateQueue = () => deactivateQueueCall(store, setStore);
  const emptyQueue = () => {
    store.queue.forEach((event) => {
      reject(event, 0);
    });
    setRecent({});
  };
  const customerExited = () => {
    customerChangedCall(store, setStore, -1);
  };

  const setCurrent = (callback) => {
    setStore({ ...store, queue: callback(store.queue) });
  };

  const removeFromCurrent = (item) =>
    setCurrent((current) => current.filter((x) => x._id !== item._id));

  const undo = () => {
    recent.exit_time = null;
    recent.accepted = false;
    console.log(recent.entry_time);
    updateEvent(recent);

    setCurrent((old) => [recent, ...old]);
    setRecent({});
  };

  const reject = (item, i) => {
    item.exit_time = new Date();
    item.accepted = false;
    updateEvent(item);

    removeFromCurrent(item, false);
  };
  const notify = (item, i) => {
    setCurrent((current) => {
      console.log(current);
      return current.map((x) => {
        if (x._id === item._id) {
          updateEvent({ ...x, notified: true });
          return { ...x, notified: true };
        } else return x;
      });
    });
  };
  const accept = (item, i) => {
    setQrData(item);
    setShowQr(true);
  };
  const qrAccept = () => {
    qrData.exit_time = new Date();
    qrData.accepted = true;
    removeFromCurrent(qrData);
    updateEvent(qrData);
    setRecent(qrData);
    customerChangedCall(store, setStore, 1);
  };
  const qrReject = () => {
    reject(qrData);
  };

  return (
    <div>
      <Header />
      {JSON.stringify(store) === "{}" && <StoreDnePopup />}
      {showQr && (
        <QrPopup
          validData={qrData._id}
          accept={qrAccept}
          reject={qrReject}
          close={() => setShowQr(false)}
        />
      )}
      {showAnn && (
        <AnnouncementPopup store={showAnn} close={() => setShowAnn(false)} />
      )}
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
            <tbody>
              <tr>
                <td rowSpan="2">
                  <NavLink to={`/store-analytics/${getStoreId()}`}>
                    <Button
                      className={classes.btnStoreAnalytics}
                      text="Store Analytics"
                    />
                  </NavLink>
                </td>
                <td>
                  <Button
                    className={classes.btnDeactivateQueue}
                    onClick={deactivateQueue}
                    text="Deactivate Queue"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className={classes.btnEmptyQueue}
                    onClick={emptyQueue}
                    text="Empty Queue"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            className={classes.btnCustomerExited}
            onClick={customerExited}
            text="Customer Exited"
          />
        </div>
        <p className={classes.recentSectionTitle}>Recently Accepted</p>
        {recent.username !== undefined && (
          <Paper className={classes.recentSection}>
            <p className={classes.recentTitle}>{recent.username}</p>
            <Button className={classes.undo} onClick={undo} text="Undo" />
          </Paper>
        )}
        <div className={classes.currentWaitingTitleBox}>
          <p className={classes.currentSectionTitle}>Currently Waiting</p>
          <Button
            className={classes.btnSendAnnouncement}
            onClick={() => setShowAnn(store)}
            text="Send Announcement"
          />
        </div>
        <Paper className={classes.currentSection}>
          {store.queue &&
            store.queue.length > 0 &&
            store.queue.map((item, i) => (
              <div key={"currentWait" + i} className={classes.currentMember}>
                <div className={classes.currentLeftStuff}>
                  <p className={classes.currentNumber}>{i + 1}</p>
                  <div className={classes.currentInfo}>
                    <p className={classes.currentTitle}>{item.username}</p>
                    <p className={classes.currentSubtitle}>
                      {`Waiting for ${Math.trunc(
                        datetime
                          .subtract(new Date(), item.entry_time)
                          .toMinutes()
                      )} minutes`}
                    </p>
                  </div>
                </div>
                <div className={classes.currentRightStuff}>
                  {/* <Button
                  className={classes.btnScanQr}
                  onClick={() => scanQr(item, i)}
                  text="Scan QR"
                /> */}
                  {item.notified ? (
                    <Button
                      className={classes.btnAccept}
                      onClick={() => accept(item, i)}
                      text="Accept"
                    />
                  ) : (
                    <Button
                      className={classes.btnNotify}
                      onClick={() => notify(item, i)}
                      text="Notify"
                    />
                  )}

                  <Button
                    className={classes.btnReject}
                    onClick={() => reject(item, i)}
                    text="Reject"
                  />
                </div>
              </div>
            ))}
        </Paper>
      </div>
    </div>
  );
}
