import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PrimaryButton from './components/PrimaryButton';

import './App.css';

function App() {
	return (
		<div className="App">
			<h1>Hello there</h1>
			<PrimaryButton></PrimaryButton>
		</div>
	);
}

export default App;
