import React, { useState, useEffect, useContext } from "react";

// we have to deconstruct this function which is a react context because there is no default export at this location
import { AuthContext } from "../routes/authentication/userAuth";

// Import module CSS
import CSS from "./register-login.module.css";

export default function Login({ history }) {
  // console.log(loginUser());
  // Set our object state
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const { user, loginUser, errors = {} } = useContext(AuthContext);

  useEffect(
    function () {
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
    },
    [user, history]
  );

  return (
    <div className={`${CSS.flex} ${CSS.centeringForm}`}>
      Login Here
      <form
        className={`${CSS.registerForm}`}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const userData = { email: userCredentials.email, password: userCredentials.password };
          loginUser(userData);
        }}
      >
        <div className={`${CSS.flex} ${CSS.marginS}`}>
          <input
            className={CSS.inputs}
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
          <label className={CSS.labels} htmlFor="email">
            Email
          </label>
          <p className="errorText">{errors.emailError}</p>
        </div>

        <div className={`${CSS.flex} ${CSS.marginS}`}>
          <input
            className={CSS.inputs}
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
          <label className={CSS.labels} htmlFor="password">
            Password
          </label>
          <p className="errorText">{errors.passwordError}</p>
        </div>

        <div className={`${CSS.flex} ${CSS.marginM}`}>
          <button type="submit" className={`${CSS.buttons}`}>
            Login
          </button>
        </div>
      </form>
      <div>
        <button className={`${CSS.buttons}`} onClick={() => history.push("/")}>
          Register
        </button>
      </div>
    </div>
  );
}
