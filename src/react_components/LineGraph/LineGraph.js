import React from 'react';

/* App.js */
import CanvasJSReact from '.././CanvasJS/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineGraph extends React.Component {
  render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Rate of User Entry"
			},
			axisY: {
				title: "Number of People",
				includeZero: false,
			},
			axisX: {
        title: "Hour of Day",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "{y} people",
				dataPoints: [
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
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default LineGraph;