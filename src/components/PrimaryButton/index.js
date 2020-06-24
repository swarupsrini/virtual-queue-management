import React from 'react';
import Button from '@material-ui/core/Button';


export default function PrimaryButton(props) {
	return (
		<Button color="primary" variant="contained" onClick={props.onClick}>{props.text}</Button>
	);
}