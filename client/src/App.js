import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import the pages you want in your React APP
import UserMainPg from "./pages/UserMainPg";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
