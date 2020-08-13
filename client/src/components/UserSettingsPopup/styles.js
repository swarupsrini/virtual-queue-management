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
    width: theme.spacing(1000 / 8),
    // marginTop: theme.spacing(30 / 8),
    padding: theme.spacing(25 / 8),
  },
  title: {
    fontSize: 36,
  },
  changePassTitle: {
    fontSize: 24,
  },
  textField: {
    width: theme.spacing(250 / 8),
  },
  topLeftMargin: {
    marginTop: theme.spacing(20 / 8),
    marginLeft: theme.spacing(20 / 8),
  },
  topMargin: {
    marginTop: theme.spacing(20 / 8),
  },
  rightMargin: {
    marginRight: theme.spacing(50 / 8),
  },
  linkButton: {
    textDecoration: "none",
  },
}));
