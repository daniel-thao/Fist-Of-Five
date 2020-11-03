import React, { useState, useEffect, useContext } from "react";

// we have to deconstruct this function which is a react context because there is no default export at this location
import { AuthContext } from "../routes/authentication/userAuth";

export default function Login({ history }) {
  // console.log(loginUser());
  // Set our object state
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const { user, loginUser, errors = {} } = useContext(AuthContext);

  useEffect(function () {
    if (user) {
      fetch("/api/user/adminCheck", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (resJSON) {
          if (resJSON.admin) {
            history.push("/admin");
          } else {
            history.push("/user");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      return;
    }
  }, [user, history]);

  return (
    <div>
      Register Here
      <form
        className="centerContent "
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const userData = { email: userCredentials.email, password: userCredentials.password };
          loginUser(userData);
        }}
      >
        <div>
          <input
            onChange={(event) =>
              setUserCredentials({ ...userCredentials, email: event.target.value })
            }
            value={userCredentials.email}
            error={errors.emailError}
            id="email"
            type="email"
            // className={classnames("", {
            //   invalid: errors.email,
            // })}
          />
          <label htmlFor="email">Email</label>
          <p className="errorText">{errors.emailError}</p>
        </div>
        <div>
          <input
            onChange={(event) =>
              setUserCredentials({ ...userCredentials, password: event.target.value })
            }
            value={userCredentials.password}
            error={errors.passwordError}
            id="password"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password,
            // })}
          />
          <label htmlFor="password">Password</label>
          <p className="errorText">{errors.passwordError}</p>
        </div>
        <div className="button marginTopM">
          <button type="submit" className="buttonText">
            Login
          </button>
        </div>
      </form>
      <div className="button marginTopM">
        <button onClick={() => history.push("/")}>Register</button>
      </div>
    </div>
  );
}
