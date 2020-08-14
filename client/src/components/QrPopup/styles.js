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
  },
  iconBack: {
    height: "200%",
    width: "200%",
  },
  qrReader: {
    height: "430px",
    width: "430px",
    margin: "10px auto",
  },
  btnP: {
    fontSize: "25px",
    width: "205px",
    height: "65px",
    color: "white",
    display: "table-cell",
    verticalAlign: "middle",
    textAlign: "center",
  },
  btnDiv: {
    borderRadius: "5px",
    display: "table",
    cursor: "pointer",
  },
  btnGroupDiv: {
    margin: "20px auto",
    display: "flex",
    justifyContent: "center",
  },
  btnLetIn: {
    backgroundColor: "#A8E071",
    marginRight: "20px",
  },
  btnReject: {
    backgroundColor: "#E86B30",
  },
  alert: {
    borderRadius: "10px",
    fontSize: "36px",
    height: "50px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    width: "420px",
    position: "absolute",
    left: "calc(50% - 210px)",
    marginTop: "-65px",
    zIndex: "2",
  },
  alertValid: {
    backgroundColor: "#CDEDAD",
    color: "#86E170",
  },
  alertInvalid: {
    backgroundColor: "#F7C0A7",
    color: "#EE7A44",
  },
  alertIcon: {
    width: "50px",
    height: "100%",
  },
}));
