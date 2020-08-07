/* 
DataCard: Used to represent a data displaying card

title: Card title, the data
subtitle: A description of the data

Example: 
<DataCard 
  title="20" 
  subtitle="In queue" >
</DataCard>
*/

import React from "react";
import useStyles from "./styles";

export default function AdminCard(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.datacard}>
      <div className={classes.datacardTitle}>
        {props.title}
      </div>
      <span className={classes.datacardNumber}>
        {props.number}
      </span>
      <span className={classes.datacardSuffix}>
        {props.suffix}
      </span>
    </div>
  );
}
