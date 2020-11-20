import React, { useEffect, useState, useContext } from "react";
// ================================================
// I wanted to use this to compare the dates of the choices coming in, but I think I'll do that idea on a diff function to a diff route
// ================================================
import dayJS from "dayjs";

// We need this function because I didn't want it to live on this JS file because it gets too janky to look at
import { populate } from "../routes/fistToFiveChoice";

// import functions needed
import { AuthContext } from "../routes/authentication/userAuth";

// import the components you wanna use for JSX
import Section from "../components/regular/Section";

// import CSS
import CSS from "../pages/admin.module.css";
import { use } from "passport";

export default function UserAdmin() {
  // This is going to be sent into the populte function as a call back and then used down in the JSX
  const [fistToFive, setFistToFive] = useState({ updateState: [] });
  const { user, logoutUser } = useContext(AuthContext);
  const [hardResetChoices, setHardResetChoices] = useState("");

  // activate the populate function right away
  useEffect(
    function () {
      // this returns data on users and their choices and when they made those choices
      populate(setFistToFive);
      // Only run this once per load
    },
    [user]
  );

  async function resetUserChoices(e) {
    e.preventDefault();
    // console.log(hardResetChoices);

    const firstCall = await fetch("/api/user/findOneUser", {
      method: "POST",
      body: JSON.stringify({ email: hardResetChoices }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJSON) => resJSON);

    for (let i = 0; i < firstCall[0].fistToFive.length; i++) {
      const choiceId = firstCall[0].fistToFive[i];

      const secondCall = await fetch("/api/user/deleteOneChoice", {
        method: "DELETE",
        body: JSON.stringify({ id: choiceId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json();
        })
        .then((resJSON) => resJSON);

      // console.log(secondCall);
    }

    const thirdCall = await fetch("/api/user/updateUserChoiceArr", {
      method: "PUT",
      body: JSON.stringify({ id: firstCall[0]._id, arr: [] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJSON) => resJSON);

      // console.log(thirdCall);

    // const secondCall = await fetch("api/user/deleteOneChoice")
  }

  async function deleteUser() {
// In here I want to make it so that I can't delete the user until I hard reset their choice arr
  }

  return (
    <div>
      {dayJS().format("YYYY-MM-DD")}
      <button onClick={logoutUser}>Logout</button>
      <Section className={CSS.container}>
        {fistToFive.updateState.map(function (arr) {
          return (
            <Section className={CSS.seperateUsers} key={arr[0]}>
              <h1>{arr[0]}</h1>
              <h1>{arr[1]}</h1>
              {arr.map(function (indexValue) {
                //   console.log(`${arr[0]} ${indexValue}`);
                return Number.isInteger(parseInt(indexValue.substr(0, 1))) ? (
                  <p key={`${arr[0]} ${indexValue}`}>{indexValue}</p>
                ) : (
                  ""
                );
              })}
            </Section>
          );
        })}
      </Section>
      <form onSubmit={resetUserChoices}>
        <input
          type="text"
          onChange={function (e) {
            e.preventDefault();
            setHardResetChoices(e.target.value);
          }}
        ></input>
        <button type="submit">Reset All User Choices</button>
      </form>
      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
}
