import React, { useState, useEffect } from "react";

// test imports, we have to deconstruct it
import { registerUser } from "../routes/authentication/userAuth";

export default function Register({history}) {
  // console.log(registerUser());
  // Set our object state
  const [newUser, setNewUser] = useState({name: "", email: "", password: "", confirmPwd: ""});

  useEffect(function() {
    // console.log(name, email, password, confirmPwd)
    console.log(newUser);
  }, [newUser]);

  return (
    <div>
      Register Here
      <form
        className="centerContent "
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(newUser, history);
        }}
      >
        <div>
          <input
            onChange={(event) => setNewUser({...newUser, name: event.target.value})}
            value={newUser.name}
            error={"errors.name which we will add later on in our useContext"}
            id="name"
            type="text"
            // className={classnames("", {
            //   invalid: errors.name,
            // })}
          />
          <label htmlFor="name">Name</label>
          <p className="errorText">{"errors.name which we will add later on in our useContext"}</p>
        </div>
        <div>
          <input
            onChange={(event) => setNewUser({...newUser, email: event.target.value})}
            value={newUser.email}
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
            onChange={(event) => setNewUser({...newUser, password: event.target.value})}
            value={newUser.password}
            error={"errors.password which we will add later on in our useContext"}
            id="password"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password,
            // })}
          />
          <label htmlFor="password">Password</label>
          <p className="errorText">{"errors.password which we will add later on in our useContext"}</p>
        </div>
        <div>
          {/* THE CLASS FOR THE DIVS className="input-field col s12" */}
          <input
            onChange={(event) => setNewUser({...newUser, confirmPwd: event.target.value})}
            value={newUser.confirmPwd}
            error={"errors.confirmPwd which we will add later on in our useContext"}
            id="confirmPwd"
            type="password"
            // className={classnames("", {
            //   invalid: errors.password2,
            // })}
          />
          <label htmlFor="confirmPwd">Confirm Password</label>
          <p className="errorText">{"errors.confirmPwd which we will add later on in our useContext"}</p>
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
