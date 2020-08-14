import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  search: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(2),
  },
  popup: {
    width: "260px",
    backgroundColor: "white",
  },
  display: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(3),
  },
  gridList: { marginLeft: theme.spacing(5) },
  tile: {
    width: "320px",
  },
}));
