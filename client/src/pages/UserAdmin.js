import React, { useEffect, useState, useContext } from "react";
// ================================================
// I wanted to use this to compare the dates of the choices coming in, but I think I'll do that idea on a diff function to a diff route
// ================================================
import dayJS from "dayjs";

// We need all of thse functions from our routes because I didn't want it to live on this JS file because it gets too janky to look at
import { populate, resetUserChoices, deleteUser, resetOneChoice } from "../routes/fistToFiveChoice";

// import functions needed
import { AuthContext } from "../routes/authentication/userAuth";

// import the components you wanna use for JSX
import Section from "../components/regular/Section";

// import CSS
import CSS from "../pages/admin.module.css";
import "./main.css";

export default function UserAdmin({history}) {
  // This is going to be sent into the populte function as a call back and then used down in the JSX
  const [fistToFive, setFistToFive] = useState({ updateState: [] });
  const { user, logoutUser } = useContext(AuthContext);
  const [hardResetChoices, setHardResetChoices] = useState("");
  const [softDeleteChoice, setSoftDeleteChoice] = useState({ email: "", choice: "", dateKey: "" });

  // activate the populate function right away
  // this returns data on users and their choices and when they made those choices once per load
  useEffect(() => {
    populate(setFistToFive);
  }, [user]);

  // This function is meant to be the gating mechanism for the next two buttons
  async function hardResetAndDeleteGate(e) {
    // Pass in the Event(e) and prevent the default
    e.preventDefault();

    // Here we are establishing a loop that goes through all the nonAdmin users we have
    for (let i = 0; i < fistToFive.updateState.length; i++) {
      // if the input value === one of the values within the User data(specifically the email, because emails are meant to be unique), do this thing
      if (hardResetChoices === fistToFive.updateState[i][1] && e.type === "submit") {
        return resetUserChoices(hardResetChoices);
      } else if (hardResetChoices === fistToFive.updateState[i][1] && e.type === "click") {
        return deleteUser(hardResetChoices);
      } else {
        console.log("type a valid user email");
      }
    }
  }

  async function oneChoiceGate(e) {
    // Pass in the Event(e) and prevent the default
    e.preventDefault();

    if (
      softDeleteChoice.email !== "" &&
      softDeleteChoice.choice !== "" &&
      softDeleteChoice.dateKey !== ""
    ) {
      return resetOneChoice(softDeleteChoice);
    } else {
      console.log("All inputs are not filled");
    }
  }

  function refreshData() {
    console.log("shouldve worked")
    history.push("/admin");
  }

  return (
    <div>
      {/* This is DayJS exact dating method */}
      {dayJS().format("YYYY-MM-DD")}
      <button onClick={logoutUser}>Logout</button>
      <button onClick={refreshData}>Refresh Data</button>

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
        <form onSubmit={hardResetAndDeleteGate}>
          <label>
            <input
              name="purgingUserData"
              type="text"
              placeholder="email of user"
              onChange={function (e) {
                e.preventDefault();
                setHardResetChoices(e.target.value);
              }}
            ></input>
          </label>

          <button type="submit">Reset All User Choices</button>
        </form>

        <button onClick={hardResetAndDeleteGate}>Delete User</button>
      </div>

      <div className="flex">
        <form onSubmit={oneChoiceGate}>
          <label>
            <input
              name="email"
              type="text"
              placeholder="email of user"
              onChange={function (e) {
                e.preventDefault();
                setSoftDeleteChoice({ ...softDeleteChoice, email: e.target.value });
              }}
            ></input>
          </label>
          <label>
            <input
              name="value"
              type="text"
              placeholder="number value of choice"
              onChange={function (e) {
                e.preventDefault();
                setSoftDeleteChoice({ ...softDeleteChoice, choice: e.target.value });
              }}
            ></input>
          </label>
          <label>
            <input
              name="dateKey"
              type="text"
              placeholder="date key of num value"
              onChange={function (e) {
                e.preventDefault();
                setSoftDeleteChoice({ ...softDeleteChoice, dateKey: e.target.value });
              }}
            ></input>
          </label>

          <button type="submit">Reset one choice</button>
        </form>
      </div>
    </div>
  );
}
