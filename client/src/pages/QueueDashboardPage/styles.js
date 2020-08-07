import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  datacard: {
    marginTop: "20px",
    marginLeft: "20px",
  },
  datacards: {
    marginTop: "20px",
    justifyContent: "space-around",
  },
  linegraph: {
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "600px",
  },
  frame: {
    marginBottom: "60px",
  },
  header: {
    marginTop: "20px",
    marginBottom: "30px",
  },
  queueButtons: {
    marginTop: "20px",
    marginBottom: "20px",
    justifyContent: "space-around",
  },
  inOutButtons: {
    marginTop: "20px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  inButton: {
    backgroundColor: "#A8E071",
    width: theme.spacing(180 / 8),
    height: theme.spacing(102 / 8),
    borderRadius: 10,
    fontSize: 24,
    float: "right",
    marginRight: "20px",
  },
  outButton: {
    backgroundColor: "#EE7A44",
    width: theme.spacing(180 / 8),
    height: theme.spacing(102 / 8),
    borderRadius: 10,
    fontSize: 24,
    float: "right",
    marginLeft: "20px",
  },
}));
