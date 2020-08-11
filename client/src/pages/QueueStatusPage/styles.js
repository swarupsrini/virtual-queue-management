import { makeStyles } from "@material-ui/core/styles";
import L from "leaflet";
import ExtraMarkers from "leaflet-extra-markers";

const useStyles = makeStyles({
  exitQueue: {
    backgroundColor: "rgba(232, 107, 48, 1.0)",
    color: "white",
    position: "absolute",
    top: "68px",
    right: "68px",
  },
  displayQR: {
    position: "absolute",
    top: "68px",
    right: "230px",
  },
  paper: {
    marginLeft: "30px",
    marginRight: "30px",
    height: "135px",
  },
  paper2: {
    marginLeft: "30px",
    marginTop: "20px",
    marginRight: "30px",
    height: "75px",
    backgroundColor: "rgba(184, 184, 184, 0.5)",
  },
  typeTitle: {
    fontSize: "20px",
    marginTop: "0px",
    marginBottom: "5px",
  },
  typeSubtitle: {
    margin: "0px",
    fontSize: "55px",
  },
  typeSubtitle2: {
    display: "inline-block",
    fontSize: "55px",
    margin: "0px",
  },
  typeSubtitle3: {
    display: "inline-block",
    fontSize: "20px",
    margin: "0px",
  },
  divElem: {
    marginTop: "10px",
    width: "226px",
    textAlign: "center",
    borderRight: "3px solid lightgray",
    height: "100px",
  },
  divElem2: {
    marginTop: "10px",
    marginLeft: "20px",
    width: "226px",
    textAlign: "left",
  },
  message: {
    marginLeft: "10px",
    display: "inline-block",
    marginTop: "20px",
  },
  storeMsg: {
    marginLeft: "10px",
    display: "inline-block",
  },
  positionQueue: {
    marginTop: "0px",
    marginLeft: "15px",
  },
  notUserQueue: {
    backgroundColor: "rgba(179, 179, 179, 0.5)",
    marginTop: "2px",
    textAlign: "center",
    height: "75px",
    display: "table",
    width: "60px",
  },
  queueTextNotUser: {
    display: "table-cell",
    fontSize: "33px",
    verticalAlign: "middle",
  },
  userQueue: {
    marginTop: "-9px",
    textAlign: "center",
    border: "4px solid",
    borderColor: "rgba(179, 179, 179, 0.5)",
    height: "85px",
    width: "70px",
  },
  queueTextUser: {
    marginBottom: "0px",
    marginTop: "12px",
    verticalAlign: "middle",
    padding: "0px",
    fontSize: "33px",
  },
  queueTextUser2: {
    margin: "0px",
    padding: "0px",
    fontSize: "20px",
  },
});

export { useStyles };
