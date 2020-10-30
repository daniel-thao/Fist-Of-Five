import React, { useState, useEffect, useContext } from "react";

// test imports, we have to deconstruct it
// import { loginUser } from "../routes/authentication/userAuth";

import { AuthContext } from "../routes/authentication/userAuth";

export default function Login({ history }) {
  // console.log(loginUser());
  // Set our object state
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const { user, loginUser, errors = {} } = useContext(AuthContext);

  useEffect(
    function () {
      if (user) {
        history.push("/user");
      }
    },
    [user, history]
  );

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
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
