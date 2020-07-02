import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

// importing all the pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoreSearchPage from "./pages/StoreSearchPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/settings" render={() => <SettingsPage />} />
          <Route path="/store-search" render={() => <StoreSearchPage />} />
          <Route path="/admin-panel" render={() => <AdminPanelPage />} />
          <Route
            exact
            path="/signup"
            render={() => <SignupPage redirect="/store-search" />}
          />
          <Route
            exact
            path="/"
            render={() => <LoginPage redirect="/store-search" />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
