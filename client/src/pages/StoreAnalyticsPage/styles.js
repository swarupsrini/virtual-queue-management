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
    marginTop: "20px",
    marginRight: "30px",
    height: "135px",
  },
  grid: {
    justifyContent: "center"

  },
  typeTitle: {
    fontSize: "20px",
    marginTop: "0px",
    marginBottom: "5px",
  },
  typeSubtitle: {
    margin: "0px",
    fontSize: "55px",
  },
  typeSubtitle2: {
    display: "inline-block",
    fontSize: "55px",
    margin: "0px",
  },
  typeSubtitle3: {
    display: "inline-block",
    fontSize: "20px",
    margin: "0px",
  },
  divElem: {
    marginTop: "10px",
    width: "156px",
    textAlign: "center",
    borderRight: "3px solid lightgray",
    height: "100px",
  },
  divElem2: {
    marginTop: "10px",
    width: "156px",
    textAlign: "center",
    height: "100px",
  },
  root: {
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "10px"
  }
});
