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
	marginBottom: "20px",
	justifyContent: "space-around"
  },
  closeQueue:{
	  width:"200px"
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

export default function QueueDashboard(props) {
  const classes = useStyles();
  const [queueOpen, setQueueOpen] = useState(true);
  const [storeCount, setStoreCount] = useState(25);
  const [queueCount, setQueueCount] = useState(20);
  const [nextGroupSize, setNextGroupSize] = useState(2);

  let closeOpenQueueText
  let inOutButtons
  if (queueOpen) {
	closeOpenQueueText = "Close Queue"
	inOutButtons = <Grid className={classes.inOutButtons} container>
		<Button 
			className={classes.inButton}
			variant="contained"
			onClick={() => {
				if (queueCount >= nextGroupSize){
					setStoreCount(storeCount+nextGroupSize);
					setQueueCount(queueCount-nextGroupSize)
				}
			}
		}>
			IN
		</Button>
		<Button 
			className={classes.outButton} 
			variant="contained" 
			onClick={() => { 
				if (storeCount > 0){
					setStoreCount(storeCount-1) 
				}
			}
		}>
			OUT
		</Button>
	</Grid>
  }
  else{
	closeOpenQueueText = "Open Queue"
  }

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
					title={storeCount}
					subtitle="In-Store" >
				</DataCard>
				<DataCard
					title={queueCount} 
					subtitle="In Queue" >
				</DataCard>
				<DataCard
					title={nextGroupSize} 
					subtitle="Next" >
				</DataCard>
			</Grid>
			<Grid className={classes.queueButtons} container>
				<SecondaryButton 
					text={closeOpenQueueText}
					onClick={(e) => {setQueueOpen(!queueOpen)}}>
				</SecondaryButton>
				<SecondaryButton 
					text="Clear Queue" 
					onClick={() => { setQueueCount(0) }}>
				</SecondaryButton>
				<SecondaryButton 
					text="Scan QR" 
					onClick={() => { console.log("scan") }}>
				</SecondaryButton>
			</Grid>
			{inOutButtons}

		</Frame>
	</div>
  );
}