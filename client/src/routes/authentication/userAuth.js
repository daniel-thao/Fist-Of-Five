import React, { useState, useEffect } from "react";
//You can import Axios at this point if you wanted to, but I will be using JS vanilla Fetch

import jwt_decode from "jwt-decode";
// Here we imported a global util of axios but How ot figure it out using fetch
import setAuthTokens from "../../utils/setAuthToken";

// const [jwtToken, setJwtToken] = useState();
// setAuthToken("daniel");

export const AuthContext = React.createContext("auth");

export const registerUser = (userData, history) => {
  fetch("/api/user/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (resJSON) {
      console.log(resJSON);
    })
    .catch(function (err) {
      console.log(err);
    });
};
