import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
// WE can import Prop-types npm package to double check the proptypes of the data that we are sending, but not totally needed
// import PropTypes from "prop-types"

//import the context that we are going to use in order to authenticate the users

export default function PrivateRoute() {
    //deconstructing the items from the context
    const {user} = useContext();
    return (
        <Route></Route>
    )
}