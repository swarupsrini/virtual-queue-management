import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { readCookie, REFRESH_INTERVAL } from "./utils/actions";
import useInterval from "./utils/useInterval";

// importing all the pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoreSearchPage from "./pages/StoreSearchPage";
import SettingsPage from "./pages/SettingsPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import StoreAnalytics from "./pages/StoreAnalyticsPage";
import QueueDashboard from "./pages/QueueDashboardPage";
import QueueStatus from "./pages/QueueStatusPage";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    readCookie(setCurrentUser);
  }, []);

  useInterval(() => {
    readCookie(setCurrentUser);
  }, [REFRESH_INTERVAL]);

  // for debugging
  useEffect(() => {
    console.log("changed current user:", currentUser);
  }, [currentUser]);

  const setUser = (newCurrentUser) => {
    setCurrentUser(newCurrentUser);
  };

  const login = (
    <Route
      exact
      path="/login"
      render={() => (
        <LoginPage
          user={currentUser}
          setUser={setUser}
          // loginRedirect={loginRedirect}
        />
      )}
    />
  );
  const signup = (
    <Route
      exact
      path="/signup"
      render={() => (
        <SignupPage
          user={currentUser}
          setUser={setUser}
          // loginRedirect={loginRedirect}
        />
      )}
    />
  );
  const storeSearch = (
    <Route path="/store-search" render={() => <StoreSearchPage />} />
  );
  const storeAnalytics = (
    <Route
      path="/store-analytics/:store_id"
      render={() => <StoreAnalytics currentUser={currentUser} />}
    />
  );
  const queueStatus = (
    <Route path="/queue-status" render={() => <QueueStatus />} />
  );
  const adminPanel = (
    <Route path="/admin-panel" render={() => <AdminPanelPage />} />
  );
  const queueDashboard = (
    <Route path="/queue-dashboard" render={() => <QueueDashboard />} />
  );
  const settings = (
    <Route
      path="/settings"
      render={() => (
        <SettingsPage currentUser={currentUser} setUser={setUser} />
      )}
    />
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* TODO: make all the routes conditional, only have them if user type allows it. */}
          {/* if no user, redirect to login */}

          {/* Routes */}
          {!currentUser && (
            <>
              {login}
              {signup}
              <Redirect from="/" to="/login" />
            </>
          )}

          {currentUser && currentUser.__t === "visitor" && (
            <>
              {storeSearch}
              {storeAnalytics}
              {queueStatus}
              {settings}
              <Redirect from="/" to="/store-search" />
            </>
          )}

          {currentUser && currentUser.__t === "owner" && (
            <>
              {queueDashboard}
              {storeAnalytics}
              {settings}
              <Redirect from="/" to="/queue-dashboard" />
            </>
          )}

          {currentUser && currentUser.__t === "employee" && (
            <>
              {queueDashboard}
              {storeAnalytics}
              {settings}
              <Redirect from="/" to="/queue-dashboard" />
            </>
          )}

          {currentUser && currentUser.__t === "admin" && (
            <>
              {adminPanel}
              {settings}
              <Redirect from="/" to="/admin-panel" />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}
