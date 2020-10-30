import React, { useState, useEffect } from "react";
//You can import Axios at this point if you wanted to, but I will be using JS vanilla Fetch

import jwt_decode from "jwt-decode";
// Here we imported a global util of axios but How ot figure it out using fetch
import setAuthTokens from "../../utils/setAuthFetchOptions";
import { set } from "mongoose";

// const [jwtToken, setJwtToken] = useState();
// setAuthToken("daniel");

export const AuthContext = React.createContext("auth");

export const registerUser = (setErrors) => (userData, history) => {
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
      if (resJSON.error) {
        console.log(resJSON.error);
        setErrors(resJSON.error);
      } else {
        history.push("/login");
      }
    })
    .catch(function (err) {
      console.log(err);
      setErrors(err);
    });
};

export const loginUser = (setUser, setErrors) => (userData, history) => {
  fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (resJSON) {
      console.log(resJSON);
      // with axios I wouldn't need to do this, but since I'm using fetch I have to
      if (resJSON.passwordIncorrect) {
        // // For now we will do this until we have our use context
        // return console.log(resJSON.passwordIncorrect);
        // setErrors(err.response.data);
      } else {
        // set the
        console.log(resJSON);
        if (resJSON.success) {
          console.log(resJSON.token);
          const token = resJSON.token;
          // const { token } = resJSON.token;
          localStorage.setItem("jwtToken", token);

          const decoded = jwt_decode(token);

          setUser(decoded);
        }
      }
    })
    .catch(function (err) {
      console.log(err);
      setErrors(err);
    });
};

export const logoutUser = (setUser) => {
  // We need to remove the token from the local storage
  localStorage.removeItem("jwtToken");

  // then use the argument to callback to the useAuth function to set the user back to null
  setUser(null);
};


export function useAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (localStorage.jwtToken) {
      // set the localstorage token to a new var
      const token = localStorage.jwtToken;

      // Then make a new var that = the decoded token
      const decoded = jwt_decode(token);

      // Then pass that var into the useState that will host the data
      setUser(decoded);

      const currentTime = Date.now() / 1000; // We need this to get it in milliseconds because we will logout the user in one year but it's decided in milliseconds

      if (decoded.exp < currentTime) {
        //then do the logout method passing in the decoded jwtToken
        logoutUser(user);
        window.location.href = "./login";
      }
    }
  }, []);

  return {
    user,
    errors,
    loginUser: loginUser(setUser, setErrors),
    logoutUser: () => logoutUser(setUser),
    registerUser: registerUser(setErrors),
  };
}

export function Auth({ children }) {
  const { user, errors, loginUser, logoutUser, registerUser } = useAuth();

  return (
    <AuthContext.Provider
      value={{ user, errors, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
