/* 
LineGraph: Used to represent a line graph of the rate of user entry

dataPoints: array of x,y values to be plotted

Example: <LineGraph dataPoints= {
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
*/

import React from 'react';

/* App.js */
import CanvasJSReact from '.././CanvasJS/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//class LineGraph extends React.Component {
export default function LineGraph(props) {
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
			interval: 1
		},
		data: [{
			type: "line",
			toolTipContent: "{y} people",
			dataPoints: props.dataPoints
		}]
	}
	return (
	<div>
		<CanvasJSChart options = {options}/>
	</div>
	);
}