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
import "./main.css";

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

  // This function is meant to be the gating mechanism for the next two buttons
  async function inputGate(e) {
    // Pass in the Event(e) and prevent the default
    e.preventDefault();

    // Here we are establishing a loop that goes through all the nonAdmin users we have
    for (let i = 0; i < fistToFive.updateState.length; i++) {
      // if the input value === one of the values within the User data(specifically the email, because emails are meant to be unique), do this thing
      if (hardResetChoices === fistToFive.updateState[i][1] && e.type === "submit") {
        return resetUserChoices();
      } else if (hardResetChoices === fistToFive.updateState[i][1] && e.type === "click") {
        return deleteUser();
      } else {
        console.log("type a valid user email");
      }
    }
  }

  // This is the process of the resetting the choices of the user you've selected
  async function resetUserChoices() {
    // Just letting you know that you've started the thing
    console.log("hard reseting the choice Arr");

    // Put this promise in a variable because we use it later
    const firstCall = await fetch("/api/user/findOneUser", {
      method: "POST",
      // passing in the input value with the property of email
      body: JSON.stringify({ email: hardResetChoices }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // This returns the whole userData
      .then((resJSON) => resJSON);

    // Once we've made the first call, start a forloop, to loop through all the choices chosen by that particular user wihtin the fistToFive array
    for (let i = 0; i < firstCall[0].fistToFive.length; i++) {
      // set a instanced variable to each array index
      const choiceId = firstCall[0].fistToFive[i];

      // then do another promise call to the fistToFive Collection to delete said choice
      await fetch("/api/user/deleteOneChoice", {
        method: "DELETE",
        // passing in the id of the choice as the id property
        body: JSON.stringify({ id: choiceId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json();
        })
        // This hopefully returns a 200 response in which case it worked
        .then((resJSON) => resJSON);
    }

    // Then finally after all the choices have been deleted from it's respective Collection, make this last call to clear update the user's fistToFive array value --> this is because deleting the reference data that one collection references, doesn't automatically delete old reference data in the other collection
    await fetch("/api/user/updateUserChoiceArr", {
      method: "PUT",
      // We pass in an id property with the id of the first call in order to find that user
      // We also pass in an empty array in an arr property as the updated value for the fistToFive property
      body: JSON.stringify({ id: firstCall[0]._id, arr: [] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // This hopefully returns a 200 resposne in which case it worked
      .then((resJSON) => resJSON);

    // Finally, we just say that you reset the choices of someone, even though there's nothing to really give this statment an immediate alibi besides the data being erased from the front end
    console.log("You Hard reset the choice Arr of Someone");
  }

  // This function is for deleting the user
  async function deleteUser() {
    // Say something to give a heads up
    console.log("deleting");

    // We make this first call to get the user data based on the email
    const firstCall = await fetch("/api/user/findOneUser", {
      method: "POST",
      body: JSON.stringify({ email: hardResetChoices }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // returns the whole user data
      .then((resJSON) => resJSON);

    // This if statment is here to check if the first index is not empty
    if (firstCall[0].fistToFive[0] === undefined || firstCall[0].fistToFive[0] === null) {
      // if the first index of the array is not empty, then run this second promise call to delete the user based off of the email
      await fetch("/api/user/deleteOneUser", {
        method: "DELETE",
        body: JSON.stringify({ email: hardResetChoices }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        // hopefully this returns a 200 response, in which case it worked, but there is no visible indication that it did work
        .then((resJSON) => resJSON);

      // This is said visible indication
      console.log("You deleted Someone");
    } else {
      // otherwise, leave a convoluded answer for whoever is using the app
      console.log("tis not empty. go empty it");
    }
  }

  return (
    <div>
      {/* This is DayJS exact dating method */}
      {dayJS().format("YYYY-MM-DD")}
      <button onClick={logoutUser}>Logout</button>
      <Section className={CSS.container}>
        {fistToFive.updateState.map(function (arr) {
          return (
            // The key prop here is because React requires it, and it needs to be unqiue from every other key prop in the react app(I think, in this case, just whatever page is loaded)
            <Section className={CSS.seperateUsers} key={arr[0]}>
              <h1>{arr[0]}</h1>
              <h1>{arr[1]}</h1>
              {arr.map(function (indexValue) {
                //   console.log(`${arr[0]} ${indexValue}`);
                return Number.isInteger(parseInt(indexValue.substr(0, 1))) ? (
                  // This is why this key prop has a longer value vs the one above
                  <p key={`${arr[0]} ${indexValue}`}>{indexValue}</p>
                ) : (
                  ""
                );
              })}
            </Section>
          );
        })}
      </Section>

      {/* Too lazy to make a component for this --> only used once in this scope of things */}
      <div className="flex">
        <form onSubmit={inputGate}>
          <label>
            <input
              name="purgingUserData"
              type="text"
              onChange={function (e) {
                e.preventDefault();
                setHardResetChoices(e.target.value);
              }}
            ></input>
          </label>

          <button type="submit">Reset All User Choices</button>
        </form>

        <button onClick={inputGate}>Delete User</button>
      </div>
    </div>
  );
}
