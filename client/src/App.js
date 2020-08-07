import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

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

const readCookie = (setCurrentUser) => {
  // currently bypassing backend w/ the next 2 lines
  setCurrentUser({});
  return;

  const url = "/users/check-session";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json && json.currentUser) {
        setCurrentUser({ currentUser: json.currentUser });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    readCookie(setCurrentUser);
  }, []);

  const setUser = (newCurrentUser) => {
    setCurrentUser(newCurrentUser);
  };

  const loginRedirect = () => {
    // if customer, redirect to store search
    // if admin, redirect to admin panel
    // if store owner, redirect to queue dashboard
    // if store employee, redirect to queue dashboard
    return <Redirect to="/store-search" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* TODO: make all the routes conditional, only have them if user type allows it. */}
          <Route
            exact
            path="/signup"
            render={() => (
              <SignupPage
                user={currentUser}
                setUser={setUser}
                loginRedirect={loginRedirect}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <LoginPage
                user={currentUser}
                setUser={setUser}
                loginRedirect={loginRedirect}
              />
            )}
          />
          <Redirect exact from="/" to="/login" />
          <Route
            path="/settings"
            render={() => <SettingsPage setUser={setUser} />}
          />
          <Route path="/store-search" render={() => <StoreSearchPage />} />
          <Route path="/admin-panel" render={() => <AdminPanelPage />} />
          <Route
            path="/store-analytics/:store_id"
            render={() => <StoreAnalytics />}
          />
          <Route path="/queue-dashboard" render={() => <QueueDashboard />} />
          <Route path="/queue-status" render={() => <QueueStatus />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
