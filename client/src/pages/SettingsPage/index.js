import React from "react";

import Header from "../../components/Header";

import StoreSettingsPopup from "../../components/StoreSettingsPopup";
import UserSettingsPopup from "../../components/UserSettingsPopup";

import useStyles from "./styles";

export default function SettingsPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header></Header>
      <UserSettingsPopup isAdmin={false} close={() => {}} />
      <StoreSettingsPopup isAdmin={false} close={() => {}} />
    </div>
  );
}
