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

export default function UserAdmin() {
  // This is going to be sent into the populte function as a call back and then used down in the JSX
  const [fistToFive, setFistToFive] = useState({ updateState: [] });
  const { user, logoutUser } = useContext(AuthContext);

  // activate the populate function right away
  useEffect(
    function () {
      // this returns data on users and their choices and when they made those choices
      populate(setFistToFive);
      // Only run this once per load
    },
    [user]
  );

  // //   console.log(dayJS().format("MM-DD-ddd mm:ss"));

  //   // I need this format in a different JS file to compare and contrast and delete really old data since I don't have a huge DB storage unit
  //   const date1 = dayJS("2020-11-25");
  //   let dateDiff = date1.diff(dayJS().format("YYYY-MM-DD"), "day");

  return (
    <div>
      {dayJS().format("YYYY-MM-DD")}
      <button onClick={logoutUser}>Logout</button>
      <Section className={CSS.container}>
        {fistToFive.updateState.map(function (arr) {
          return (
            <Section className={CSS.seperateUsers} key={arr[0]}>
              <h1>{arr[0]}</h1>
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
    </div>
  );
}
