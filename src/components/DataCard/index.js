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
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";

export default function AdminCard(props) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary">
          {props.subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
