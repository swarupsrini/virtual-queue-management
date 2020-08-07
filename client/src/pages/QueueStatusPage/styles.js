import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
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
    // marginTop: "20px",
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
    display: "inline-block",
  },
  typeSubtitle: {
    display: "inline-block",
  },
  divElem: {
    marginTop: "10px",
    width: "226px",
    textAlign: "center",
    borderRight: "2px solid lightgray",
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
});
