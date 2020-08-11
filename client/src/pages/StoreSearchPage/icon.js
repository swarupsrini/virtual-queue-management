import L from "leaflet";
import ExtraMarkers from "leaflet-extra-markers";

const iconPerson = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const best = L.ExtraMarkers.icon({
  icon: "fa-map-pin",
  iconColor: "black",
  markerColor: "black",
  shape: "square",
  prefix: "fa",
});
export { iconPerson, best };
