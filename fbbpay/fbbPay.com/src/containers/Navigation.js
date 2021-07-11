import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Cart from "./Cart";

// import Notfound from "./notFound";

//this class navigates to different pages of the app based on the user input and on the state of the
// user i.e. if the user is logged in or not.

class Navigation extends React.Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute authenticated={false} exact path="/" />
        <Route
          path="/home"
          render={(props) => (
            <Home {...props} authenticated={this.props.authenticated} />
          )}
        />
        {/* the routing is protected based on the login-logout state of the user */}
        <ProtectedRoute
          authenticated={!this.props.authenticated}
          path="/login"
          component={LoginForm}
        />
        <ProtectedRoute
          path="/signup"
          authenticated={!this.props.authenticated}
          component={SignupForm}
        />
         <ProtectedRoute
          authenticated={this.props.authenticated}
          path="/cart"
          component={Cart}
        />
        {/* <Route component={Notfound} /> */}
      </Switch>
    );
  }
}

export default Navigation;
