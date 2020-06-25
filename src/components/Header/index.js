import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	one: {
		marginLeft: theme.spacing(2),
	},
}));

export default function Header(props) {
	const classes = useStyles();
	return (
		<AppBar position="fixed">
			<Toolbar variant="dense">
				<Typography variant="h6" color="inherit">
					Store Search
    		</Typography>
				<Typography variant="h6" color="inherit" className={classes.one}>
					Store Search
    		</Typography>
				<IconButton
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={console.log("clicked account")}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}