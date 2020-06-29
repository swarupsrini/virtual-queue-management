/* 
LineGraph: Used to represent a line graph of the rate of user entry

yValues: number of people at each hour the store is open
startTime: hour store opens (24 hour format ie/ instead of 1pm, pass 13)

Example: 
<LineGraph 
	yValues= {[8,8,8,15,30,30,28,25,33,18,10,10,5]}
	startTime = {8}
/>
*/

import React from 'react';

/* App.js */
import CanvasJSReact from './CanvasJS/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//class LineGraph extends React.Component {
export default function LineGraph(props) {
	var i;
	let dataPoints = []
	for (i = 0; i < props.yValues.length; i++) {
		dataPoints.push({x:i,y:props.yValues[i]})
	}

	const options = {
		animationEnabled: true,
		theme: "light2", // "light1", "dark1", "dark2"
		title:{
			text: "Rate of User Entry"
		},
		axisY: {
			title: "Number of People",
		},
		axisX: {
			title: "Hour of Day",
			interval: 1,
			labelFormatter: function (e) {
					return CanvasJS.formatDate( new Date(Date.UTC (2012, 1, 1, props.startTime + e.value + 5,0)), "htt");
				},
		},
		data: [{
			type: "line",
			toolTipContent: "{y} people",
			dataPoints: dataPoints
		}],
		height:260
	}
	
	
	return (
	<div>
		<CanvasJSChart options = {options}/>
	</div>
	);
}