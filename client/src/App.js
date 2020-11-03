import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import the pages you want in your React APP
import UserMainPg from "./pages/UserMainPg";
import Register from "./pages/Register.js";
import Login from "./pages/Login";
import UserAdmin from "./pages/UserAdmin";

// Import your custom PRIVATE ROUTE
import PrivateRoute from "./privateRoute/PrivateRoute";

//import your REACT CONTEXTS for logging in and stuff
import { Auth } from "./routes/authentication/userAuth";

function App() {
  return (
    <Auth>
      <Router>
        <Route exact path="/" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Switch>
          <PrivateRoute exact path="/user" component={UserMainPg}></PrivateRoute>
          <PrivateRoute exact path="/admin" component={UserAdmin}></PrivateRoute>
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
