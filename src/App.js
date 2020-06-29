import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DataCard from "./components/DataCard"
import AdminCard from "./components/AdminCard"
import Header from "./components/Header"
import LineGraph from "./components/LineGraph"
import PrimaryButton from "./components/PrimaryButton"
import SaveButton from "./components/SaveButton"
import Search from "./components/Search"
import SecondaryButton from "./components/SecondaryButton"
import StoreCard from "./components/StoreCard"
import StoreHeader from "./components/StoreHeader"


import { TextField } from "@material-ui/core";

import "./App.css";

function App() {
	return (
		<div className="App">
			<h1>Hello there</h1>
      <AdminCard 
        title="Walmart" 
        subtitle="Store ID: 1003" 
        editClick={() => console.log()} 
        address="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5">
      </AdminCard>
      <DataCard 
        title="20" 
        subtitle="In queue" >
      </DataCard>
      <LineGraph dataPoints= {
        [
          { x: new Date(Date.UTC (2012, 1, 1, 13,0)), y: 8 },
          { x: new Date(Date.UTC (2012, 1, 1, 14,0)), y: 8 },
          { x: new Date(Date.UTC (2012, 1, 1, 15,0)), y: 8 },
          { x: new Date(Date.UTC (2012, 1, 1, 16,0)), y: 15 },
          { x: new Date(Date.UTC (2012, 1, 1, 17,0)), y: 30 },
          { x: new Date(Date.UTC (2012, 1, 1, 18,0)), y: 30 },
          { x: new Date(Date.UTC (2012, 1, 1, 19,0)), y: 28 },
          { x: new Date(Date.UTC (2012, 1, 1, 20,0)), y: 25 },
          { x: new Date(Date.UTC (2012, 1, 1, 21,0)), y: 33 },
          { x: new Date(Date.UTC (2012, 1, 1, 22,0)), y: 18 },
          { x: new Date(Date.UTC (2012, 1, 1, 23,0)), y: 10 },
          { x: new Date(Date.UTC (2012, 1, 1, 24,0)), y: 10 },
          { x: new Date(Date.UTC (2012, 1, 1, 25,0)), y: 5 },
        ]}
        />
      <PrimaryButton 
        text="dwd Kenobi" 
        onClick={() => { console.log("hello") }}>
      </PrimaryButton><br></br>
      <SaveButton 
        onClick={() => { console.log("save clicked") }}>
      </SaveButton>
      <Search filterClick= {() => console.log()} searchClick = {() => console.log()}/>
      <SecondaryButton 
        text="some text" 
        onClick={() => { console.log("bye") }}>
      </SecondaryButton>
      <StoreCard 
        title="Walmart" 
        min="10" 
        verified={true} 
        favorited={false} 
        joinClick={() => console.log()} 
        viewClick={() => console.log()} 
        address="300 Borough Dr Unit 3635, Scarborough, ON M1P 4P5">
      </StoreCard>
      <StoreHeader
        title="Walmart"
        subtitle1="300 Borough Dr Unit 3635,"
        subtitle2="Scarborough, ON M1P 4P5"
      />
      <TextField variant="outlined"></TextField>
		</div>
	);
}

export default App;
