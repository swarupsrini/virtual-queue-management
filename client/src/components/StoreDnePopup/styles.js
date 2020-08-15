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
    width: "520px",
    height: "115px",
    padding: "25px",
  },
  title: {
    fontSize: "25px",
    margin: "0px",
    marginBottom: "25px",
    textAlign: "center",
  },
}));
