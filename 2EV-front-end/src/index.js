import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
// The line below is used to ignore the warning about unused 
// variable for line 13.
// eslint-disable-next-line
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import DashboardPage from "views/DashboardPage/DashboardPage.js";
import BookingPage from "views/BookingPage/BookingPage.js";

import { Provider } from "react-redux";
import { store, persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={hist}>
        <Switch>
          <Route path="/landing" component={LandingPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/booking" component={BookingPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>,
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

