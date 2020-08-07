/* 
StoreCard: Used to represent a store

title: Card title
min: The minutes left to get to the start of the queue
verified: Whether or not the store is verified
favorited: The initial favorited status of the store
joinClick: Called when "join queue" clicked
viewClick: Called when "view data" clicked
address: The string address

Example: 
<StoreCard 
  title="Walmart" 
  min="10" 
  verified={true} 
  favorited={false} 
  joinClick={joinCallback} 
  viewClick={viewCallback} 
  updateUserFav={(fav) => updateUserFavStores(store.ID, fav)}
  address="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5">
</StoreCard>
*/

import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import useStyles from "./styles";

export default function StoreCard(props) {
  const classes = useStyles();
  const [favorited, setFavorited] = useState(props.favorited);

  function favoriteClick(e) {
    props.updateUserFav(!favorited);
    setFavorited(!favorited);
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {props.verified === true && (
          <CheckIcon className={classes.topIcon}></CheckIcon>
        )}
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography color="textSecondary">
          Wait Time: {props.min} min
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary">
          Distance: {props.dist} km
        </Typography>
        <Typography variant="body2" component="p">
          {props.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={props.joinClick} color="primary" size="small">
          <strong>Join Queue</strong>
        </Button>
        <Button onClick={props.viewClick} color="primary" size="small">
          <strong>View Data</strong>
        </Button>
        <IconButton onClick={favoriteClick} aria-label="favorite">
          {favorited ? (
            <StarIcon></StarIcon>
          ) : (
            <StarBorderIcon></StarBorderIcon>
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
