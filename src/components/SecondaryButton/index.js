import React from 'react';
import Button from '@material-ui/core/Button';
/*
Secondary Button: Used to represent Buttons with secondary functionality in the app

text: text to be displayed in the secondary button
onClick: Called when button is clicked

Example: <SecondaryButton 
			text="some text" 
			onClick={() => { console.log("bye") }}>
		</SecondaryButton>

*/
export default function SecondaryButton(props) {
	return (
		<Button color="default" variant="contained" onClick={props.onClick}>{props.text}</Button>
	);
}