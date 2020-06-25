/*
Primary Button: Used to represent Buttons with primary functionality in the app

text: text to be displayed in the primary button
onClick: Called when button is clicked

Example: <PrimaryButton 
			text="dwd Kenobi" 
			onClick={() => { console.log("hello") }}>
		</PrimaryButton><br></br>

*/
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PrimaryButton(props) {
	return (
		<Button color="primary" variant="contained" onClick={props.onClick}>{props.text}</Button>
	);
}