import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
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
  inOutButtons:{
	marginTop: "20px",
	justifyContent: "space-around",
	textAlign: "center",
  },
  inOutButtons2:{
	marginTop: "20px",
	justifyContent: "space-around",
	textAlign: "center",
  }
}));

//<Grid container spacing={4}>
//<Grid item xl={3} lg={3} md={4} s={12} xs={12}>

export default function QueueDashboard(props) {
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.root}>
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
					onClick={() => { console.log("close") }}>
				</SecondaryButton>
				<SecondaryButton 
					text="Clear Queue" 
					onClick={() => { console.log("clear") }}>
				</SecondaryButton>
			</Grid>
			<Grid className={classes.inOutButtons} container>
				<PrimaryButton 
					text="In" 
					onClick={() => { console.log("close") }}>
				</PrimaryButton>
				<PrimaryButton 
					text="Out" 
					onClick={() => { console.log("clear") }}>
				</PrimaryButton>
			</Grid>
			<Grid container>
				<button className={classes.inOutButtons} onclick="myFunction()">Click me</button>
			</Grid>

		</Frame>
	</Container>
  );
}