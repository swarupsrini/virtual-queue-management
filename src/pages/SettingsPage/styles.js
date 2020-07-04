import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: theme.spacing(1000 / 8),
    marginTop: theme.spacing(30 / 8),
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
  employeeList: {
    overflow: "auto",
    height: theme.spacing(100 / 8),
    width: theme.spacing(600 / 8),
    marginLeft: theme.spacing(20 / 8),
  },
}));