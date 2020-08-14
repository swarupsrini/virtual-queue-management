import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(163, 163, 163, 0.7)",
    height: "100%",
    width: "100%",
    position: "fixed",
    left: "0px",
    top: "0px",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "715px",
    height: "530px",
    padding: "25px",
  },
  btnBack: {
    backgroundColor: "#BDBDBD",
    height: "45px",
    width: "45px",
    float: "right",
    // position: "absolute",
    // right: "19px",
    // top: "10px",
  },
  iconBack: {
    height: "200%",
    width: "200%",
  },
}));
