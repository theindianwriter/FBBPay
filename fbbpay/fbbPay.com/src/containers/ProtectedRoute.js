import React from "react";
import { Route, Redirect } from "react-router-dom";

//this class protects the routing and based on the login-logout state of the user redirects to the
// desired page

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  //if the user is authenticated then only it would render the component as passed in the props
  //else it would redireect to the home page of the fbOnline web app
  return (
    <Route
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to="/home" />
      }
      {...rest}
    />
  );
};
export default ProtectedRoute;
