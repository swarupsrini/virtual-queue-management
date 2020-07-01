import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { makeStyles, fade } from '@material-ui/core/styles';
import StoreCard from "../../components/StoreCard";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import "./index.css";
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  leftOverlay: {
    position: "fixed",
    maxHeight: "calc(100% - 75px)",
    overflow: "auto",
  },

}));

export default function StoreSearchPage(props) {
  const classes = useStyles();
  const [stores, setStores] = useState([
    {
      name: "Walmart",
      address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
      latitude: 43.776300,
      longitude: -79.258020,
      ID: 0,
    },
    {
      name: "No Frills",
      address: "4473 Kingston Rd, Scarborough, ON M1E 2N7",
      latitude: 43.769840,
      longitude: -79.187420,
      ID: 1,
    },
    {
      name: "FreshCo",
      address: "650 Kingston Rd, Pickering, ON L1V 1A6",
      latitude: 43.818070,
      longitude: -79.118870,
      ID: 2
    },
    {
      name: "FreshCo",
      address: "650 Kingston Rd, Pickering, ON L1V 1A6",
      latitude: 43.818070,
      longitude: -79.118870,
      ID: 2
    },
  ])

  return (
    <div className={classes.root}>
      <Map center={[43.653689, -79.385906]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stores.map(store => (
          console.log(store),
          <Marker
            key={store.ID}
            position={[store.latitude, store.longitude]}>
          </Marker>
        ))}

      </Map>
      <List className={classes.leftOverlay}>
        {stores.map(store => (
          <ListItem>
            <StoreCard
              title={store.name}
              min="10"
              verified={true}
              favorited={true}
              joinClick={null}
              viewClick={null}
              address={store.address} >
            </StoreCard>
          </ListItem>
        ))}
      </List>

    </div >
  );
}