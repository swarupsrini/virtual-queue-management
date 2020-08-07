/* 
AdminCard: Used to represent a card on the admin page

title: Card title
subtitle: Card subtitle
editClick: Called when "edit" clicked
address: The string address

Example:
<AdminCard 
  title="Walmart" 
  subtitle="Store ID: 1003" 
  editClick={editCallback} 
  address="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5">
</AdminCard>
*/

import React from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
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
