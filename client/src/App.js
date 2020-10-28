import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import the pages you want in your React APP
import UserMainPg from "./pages/UserMainPg";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Register}></Route>
      <Switch>
        <Route exact path="/user" component={UserMainPg}></Route>
      </Switch>
    </Router>
  );
}

export default App;
