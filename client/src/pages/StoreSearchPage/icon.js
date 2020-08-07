import L from "leaflet";

const blueDot = new L.Icon({
  iconUrl: require("./dot.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(15, 15),
  className: "leaflet-div-icon",
});

export { blueDot };
