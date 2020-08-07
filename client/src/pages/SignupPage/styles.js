import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(572 / 8),
    height: theme.spacing(481 / 8),
  },
  title: {
    fontSize: 48,
  },
  textField: {
    marginTop: theme.spacing(16 / 8),
    width: theme.spacing(300 / 8),
  },
  selectField: {
    marginTop: theme.spacing(16 / 8),
    width: theme.spacing(300 / 8),
    height: "40px",
  },
  selectLabel: {
    marginTop: theme.spacing(4 / 8),
    marginLeft: theme.spacing(13 / 8),
  },
  halfWidth: {
    width: theme.spacing(146 / 8),
  },
  rightMargin: {
    marginRight: theme.spacing(8 / 8),
  },
  loginButton: {
    marginTop: theme.spacing(40 / 8),
  },
  linkButton: {
    marginTop: theme.spacing(10 / 8),
    textDecoration: "none",
  },
}));
