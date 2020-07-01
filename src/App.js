import React, { useState, useContext } from "react";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";

// importing all the pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoreSearchPage from "./pages/StoreSearchPage";

import "./App.css";


function App() {
	return (
		<div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/search' render={() => (<StoreSearchPage/>)}/>
          <Route exact path='/signup' render={() => (<SignupPage redirect="/search"/>)}/>
          <Route exact path='/' render={() => (<LoginPage redirect="/search"/>)}/>
        </Switch>
      </BrowserRouter>
		</div>
	);
}

export default App;
