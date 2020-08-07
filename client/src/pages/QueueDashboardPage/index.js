import React, { useState } from "react";
import StoreHeader from "../../components/StoreHeader";

import Header from "../../components/Header";
import useStyles from "./styles";

export default function QueueDashboard(props) {
  const classes = useStyles();

  const [user, getUser] = useState({});
  useInterval(async () => {});

  return (
    <div>
      <Header></Header>
      <StoreHeader
        title="Walmart"
        subtitle="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5"
      ></StoreHeader>
    </div>
  );
}
