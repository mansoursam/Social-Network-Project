import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utiles/setAuthToken";
import { setCurrentUser } from "./actions/authAction";
import { Provider } from "react-redux";
import LandingPage from "./components/landing";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import LoginPage from "./components/login";
import SignupPage from "./components/registration";
import Dashboard from "./components/dashboard";
import store from "./store";
import CreateProfile from "./components/createProfile";
//check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route path="/users/login" component={LoginPage} />
          <Route path="/users/registration" component={SignupPage} />
          <Switch>
            <PrivateRoute exact path="/profiles" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
