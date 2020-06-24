import React from 'react';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#4455BB",
		},
	},
});

export default function PrimaryButton(props) {
	return (
		<ThemeProvider theme={theme}>
			<Button color="primary" variant="contained" onClick={props.onClick}>{props.text}</Button>
		</ThemeProvider>
	);
}