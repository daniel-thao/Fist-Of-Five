import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// WE can import Prop-types npm package to double check the proptypes of the data that we are sending, but not totally needed
// import PropTypes from "prop-types"

//import the context that we are going to use in order to authenticate the users
import { AuthContext } from "../routes/authentication/userAuth";

// the reason we pass in component, is because, we are trying to utilize this as a <Route> component from base React and that comes with a specialized prop called component. We are trying to say make that component === the <Component> we are passing into this <PrivateRoute> component.
export default function PrivateRoute({ component: Component, ...rest }) {
  //deconstructing the items from the context
  const { user } = useContext(AuthContext);
  return (
    // here we are declaring that we are expecting this new <PrivateRoute> to act as a <Route> component
    <Route
      // We pass in the rest of the things here via the spread operator
      {...rest}
      // We then render the outcome of this <Route> through a ternary if statement
      // If there is a user, then render what comes before the ":" otherwise do what comes after.
      // Additionally the first portion is going to send us to the Component that you set this <PrivateRoute> to along with all the props you have
      // The second part is redirecting you to this specific url param which you should have built into your routes
      render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
    ></Route>
  );
}
