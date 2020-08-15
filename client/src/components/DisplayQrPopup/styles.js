import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(163, 163, 163, 0.7)",
    height: "100%",
    width: "100%",
    position: "fixed",
    left: "0px",
    top: "0px",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "715px",
    margin: "auto",
    height: "530px",
    padding: "25px",
  },
  btnBack: {
    backgroundColor: "#BDBDBD",
    height: "45px",
    width: "45px",
    float: "right",
  },
  iconBack: {
    height: "200%",
    width: "200%",
  },
  qrDisplay: {
    marginLeft: "23%",
    marginTop: "10%",
  },
}));
