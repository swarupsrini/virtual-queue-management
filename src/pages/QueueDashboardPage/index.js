import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Header from "../../components/Header";

const useStyles = makeStyles((theme) => ({
  datacard: {
	marginTop: "20px",
	marginLeft: "20px"
  },
  datacards:{
	marginTop: "20px",
	justifyContent: "space-around"
  },
  linegraph:{
	  marginTop: "30px",
	  marginBottom: "30px",
	  marginLeft: "auto",
	  marginRight: "auto",
	  width:"600px",
  },
  frame: {
	marginBottom:"60px"
  },
  header:{
	  marginTop:"20px",
	  marginBottom:"30px"
  },
  queueButtons:{
	marginTop: "20px",
	justifyContent: "space-around"
  },
  closeQueue:{
  },
  clearQueue:{
  },
  inOutButtons:{
	marginTop: "20px",
	marginBottom: "20px",
	justifyContent: "center",
  },
  inButton:{
	backgroundColor: "#A8E071",
	width: theme.spacing(180 / 8),
	height: theme.spacing(102 / 8),
	borderRadius: 10,
	fontSize: 24,
	float: "right",
	marginRight: "20px",
  },
  outButton:{
	backgroundColor: "#EE7A44",
	width: theme.spacing(180 / 8),
	height: theme.spacing(102 / 8),
	borderRadius: 10,
	fontSize: 24,
	float: "right",
	marginLeft: "20px",
  },
  popup: {
    width: "260px",
    backgroundColor: "white",
  },
}));

//<Grid container spacing={4}>
//<Grid item xl={3} lg={3} md={4} s={12} xs={12}>

export default function QueueDashboard(props) {
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  return (
    <div>
		<Header></Header>
		<Frame className={classes.frame} size={300} center width={904} height="auto" background={"#FFFFFF"} shadow="1px 1px 3px 2px grey" radius = {8}>
			<div className={classes.header}>
				<StoreHeader
					title="Walmart"
					subtitle1="300 Borough Dr Unit 3635,"
					subtitle2="Scarborough, ON M1P 4P5"
					/>
			</div>
			<Grid className={classes.datacards} container>
				<DataCard
					title="25" 
					subtitle="In-Store" >
				</DataCard>
				<DataCard
					title="20" 
					subtitle="In Queue" >
				</DataCard>
				<DataCard
					title="2" 
					subtitle="Next" >
				</DataCard>
			</Grid>
			<Grid className={classes.queueButtons} container>
				<SecondaryButton 
					text="Close Queue" 
					onClick={props.closeQueueClick}>
				</SecondaryButton>
				<SecondaryButton 
					text="Clear Queue" 
					onClick={() => { console.log("clear") }}>
				</SecondaryButton>
				<SecondaryButton 
					text="Scan QR" 
					onClick={(e) => {setAnchor(e.currentTarget);}}>
				</SecondaryButton>
			</Grid>
			<Grid className={classes.inOutButtons} container>
				<Button className={classes.inButton} variant="contained" onClick={props.onClick}>
					IN
				</Button>
				<Button className={classes.outButton} variant="contained" onClick={props.onClick}>
					OUT
				</Button>
			</Grid>

		</Frame>
	</div>
  );
}