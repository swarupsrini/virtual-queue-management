/* 
DataCard: Used to represent a data displaying card

title: Card title, the data
subtitle: A description of the data

Example: <DataCard 
            title="20" 
            subtitle="In queue" >
          </DataCard>
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Button, Typography, IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
		width: 200,
		height: 100,
  },
  content: {
    position: "relative",
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    marginBottom: 12,
  },
});

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
