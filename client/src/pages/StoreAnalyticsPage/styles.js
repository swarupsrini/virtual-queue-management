import { makeStyles } from "@material-ui/core/styles";
export default makeStyles({
  datacard: {
    marginLeft: "20px",
    width:"300px",
    textAlign:"center",
    font:"Inter",
    fontStyle:"regular",
    color:"black",
  },
  datacards: {
    justifyContent: "space-evenly",
  },
  backButton: {
    position: "absolute",
    top: "80px",
    right: "200px",
    width: "150px"
  },
  joinQueueButton: {
    position: "absolute",
    top: "80px",
    right: "30px",
    width: "150px"
  },
  linegraph: {
    boxShadow: "0px 0px 3px #9E9E9E",
    marginTop:"30px",
    marginBottom:"30px",
    height: "100%"
  },
  frame: {
    boxShadow: "0px 0px 3px #9E9E9E",
    marginTop:"40px",
    marginBottom:"50px"
  },
  line:{
    backgroundColor: "#A1A1A1",
    opacity:"0.5",
    width:"2px",
    marginTop:"12px",
    marginBottom:"12px",
  },
  paper: {
    marginLeft: "30px",
    marginTop: "20px",
    marginRight: "30px",
    height: "135px",
  },
  typeSubtitle: {
    display: "inline-block",
  },
  divElem: {
    marginTop: "10px",
    width: "120px",
    textAlign: "center",
    borderRight: "2px solid lightgray",
  },
  root: {
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "10px"
  }
});
