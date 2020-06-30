import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// importing all the pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import "./App.css";

function App() {
	return (
		<div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => 
                          (<LoginPage/>)}/>
          <Route exact path='/signup' render={() => 
                          (<SignupPage/>)}/>
        </Switch>
      </BrowserRouter>
		</div>
	);
}

export default App;
