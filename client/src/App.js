import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import the pages you want in your React APP
import UserMainPg from "./pages/UserMainPg";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Switch>
        <Route exact path="/user" component={UserMainPg}></Route>
      </Switch>
    </Router>
  );
}

export default App;
