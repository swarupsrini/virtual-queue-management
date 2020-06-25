/* 
AdminCard: Used to represent a card on the admin page

title: Card title
subtitle: Card subtitle
editClick: Called when "edit" clicked
address: The string address

Example: <AdminCard 
            title="Walmart" 
            subtitle="Store ID: 1003" 
            editClick={editCallback} 
            address="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5">
          </AdminCard>
*/

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Button, Typography, IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
		width: 300,
		height: 200,
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
        <Typography variant="body2" component="p">
          {props.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={props.editClick} color="primary" size="small"><strong>Edit</strong></Button>
      </CardActions>
    </Card>
  );
}
