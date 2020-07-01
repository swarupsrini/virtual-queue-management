import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import "./index.css";
// import "leaflet/dist/leaflet.css";

const stores = [
  {
    name: "Walmart",
    address: "300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5",
    latitude: 43.776300,
    longitude: -79.258020,
  },
  {
    name: "No Frills",
    address: "4473 Kingston Rd, Scarborough, ON M1E 2N7",
    latitude: 43.769840,
    longitude: -79.187420,
  },
  {
    name: "FreshCo",
    address: "650 Kingston Rd, Pickering, ON L1V 1A6",
    latitude: 43.818070,
    longitude: -79.118870,
  },
]
export default function StoreSearchPage(props) {
  // const [lat, setLat] = useState(51.505);
  // const [lng, setLng] = useState(-0.09);
  // const [zoom, setZoom] = useState(13);

  // const position = [lat, lng]
  return (
    <Map center={[43.653689, -79.385906]} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker> */}
    </Map>
  );
}