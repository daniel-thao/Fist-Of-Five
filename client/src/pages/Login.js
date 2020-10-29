import React, { useState, useEffect } from "react";

// test imports, we have to deconstruct it
import { loginUser } from "../routes/authentication/userAuth";

export default function Login({ history }) {
  // console.log(loginUser());
  // Set our object state
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(
    function () {
      // console.log(name, email, password, confirmPwd)
      console.log(user);
    },
    [user]
  );

  return (
    <div>
      Register Here
      <form
        className="centerContent "
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(user, history);
        }}
      >
        <div>
          <input
            onChange={(event) => setUser({ ...user, email: event.target.value })}
            value={user.email}
            error={"errors.email which we will add later on in our useContext"}
            id="email"
            type="email"
            // className={classnames("", {
            //   invalid: errors.email,
            // })}
          />
          <label htmlFor="email">Email</label>
          <p className="errorText">{"errors.email which we will add later on in our useContext"}</p>
        </div>
        <div>
          <input
            onChange={(event) => setUser({ ...user, password: event.target.value })}
            value={user.password}
            error={"errors.password which we will add later on in our useContext"}
            id="password"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password,
            // })}
          />
          <label htmlFor="password">Password</label>
          <p className="errorText">
            {"errors.password which we will add later on in our useContext"}
          </p>
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
