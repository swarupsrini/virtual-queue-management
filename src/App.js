import React, { useState, useContext } from "react";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";

// importing all the pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoreSearchPage from "./pages/StoreSearchPage";
import SettingsPage from "./pages/SettingsPage";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/settings" render={() => <SettingsPage />} />
          <Route path="/search" render={() => <StoreSearchPage />} />
          <Route
            exact
            path="/signup"
            render={() => <SignupPage redirect="/search" />}
          />
          <Route
            exact
            path="/"
            render={() => <LoginPage redirect="/search" />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
