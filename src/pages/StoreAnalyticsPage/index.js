/* 
StoreHeader: Used to represent the header of a store

title: store name
subtitle1: first part of address (street name and num)
subtitle2: 2nd part of address (city, province, postal code)

Example: <StoreHeader
          title="Walmart"
          subtitle1="300 Borough Dr Unit 3635,"
          subtitle2="Scarborough, ON M1P 4P5"
        />
*/
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";

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
  }
});

//<Grid container spacing={4}>
//<Grid item xl={3} lg={3} md={4} s={12} xs={12}>

export default function StoreAnalytics(props) {
  const classes = useStyles();
  return (
    <div>
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
					subtitle="In queue" >
				</DataCard>
				<DataCard
					title="20 min" 
					subtitle="Estimated Wait Time" >
				</DataCard>
				<DataCard
					title="45" 
					subtitle="In-Store" >
				</DataCard>
			</Grid>
			<div className={classes.linegraph}>
				<LineGraph 
					yValues= {[8,8,8,15,30,30,28,25,33,18,10,10,5]}
					startTime = {8}
				/>
			</div>
		</Frame>
    </div>
  );
}