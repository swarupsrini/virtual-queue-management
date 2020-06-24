import React from 'react';
import Button from '@material-ui/core/Button';

export default function SecondaryButton(props) {
	return (
		<Button color="default" variant="contained" onClick={props.onClick}>{props.text}</Button>
	);
}