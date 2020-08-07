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
  linegraph: {
    boxShadow: "0px 0px 3px #9E9E9E",
    margin: "30px",
    height: "100%"
  },
  frame: {
    boxShadow: "0px 0px 3px #9E9E9E",
    margin:"30px",
    marginBottom:"50px"
  },
  line:{
    backgroundColor: "#A1A1A1",
    opacity:"0.5",
    width:"4px",
    marginTop:"10px",
    marginBottom:"10px",
  }
});
