import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import qrcode from "../../images/qrcode.png"
import Header from "../../components/Header";
import { Link} from "react-router-dom";
import { Button} from "@material-ui/core";

let imagePath = 'public/qrcode.png';

const useStyles = makeStyles({
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
  },
  qrcode:{
	marginTop: "20px",
	display: "block",
	marginLeft: "auto",
	marginRight: "auto",
	width:"200px"
  },
  exitQueue:{
	marginBottom: "20px",
	textAlign: "center",
  },
});

//<Grid container spacing={4}>
//<Grid item xl={3} lg={3} md={4} s={12} xs={12}>

export default function QueueStatus(props) {
  const classes = useStyles();
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
					title="20" 
					subtitle="In Queue" >
				</DataCard>
				<DataCard
					title="45" 
					subtitle="My ID" >
				</DataCard>
				<DataCard
					title="5" 
					subtitle="Position" >
				</DataCard>
			</Grid>
			<img src={qrcode} className={classes.qrcode}></img>
			<div className={classes.exitQueue}>
				<Link to="/store-search">
					<PrimaryButton 
						text="Exit Queue" 
						onClick={() => { console.log("exit queue") }}>
					</PrimaryButton>
				</Link>
			</div>
			
		</Frame>
    </div>
  );
}