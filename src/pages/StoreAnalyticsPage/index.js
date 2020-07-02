import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import StoreHeader from "../../components/StoreHeader";
import LineGraph from "../../components/LineGraph";
import DataCard from "../../components/DataCard";
import { Frame } from "framer";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/Header";

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
  const [storeCount] = useState(0);
  const [queue] = useState([2,1,1,3]);
  const [avgShoppingLength] = useState(10);
  const [storeCapacity] = useState(30);
  const [storeOpenTime] = useState(8);
  const [storeTraffic] = useState([8,8,8,15,30,30,28,25,33,18,10,10,5]);
  const [storeName] = useState("Walmart");
  const [smallAddress] = useState("300 Borough Dr Unit 3635,");
  const [bigAddress] = useState("Scarborough, ON M1P 4P5");

  return (
    <div>
		<Header></Header>
		<Frame className={classes.frame} size={300} center width={904} height="auto" background={"#FFFFFF"} shadow="1px 1px 3px 2px grey" radius = {8}>
			<div className={classes.header}>
				<StoreHeader
					title={storeName}
					subtitle1={smallAddress}
					subtitle2={bigAddress}
					/>
			</div>
			<Grid className={classes.datacards} container>
				<DataCard
					title={queue.length}
					subtitle="In queue" >
				</DataCard>
				<DataCard
					title={Math.round(avgShoppingLength * queue.length / storeCapacity)+ " min"} 
					subtitle="Estimated Wait Time" >
				</DataCard>
				<DataCard
					title={storeCount}
					subtitle="In-Store" >
				</DataCard>
			</Grid>
			<div className={classes.linegraph}>
				<LineGraph 
					yValues= {storeTraffic}
					startTime = {storeOpenTime}
				/>
			</div>
		</Frame>
    </div>
  );
}