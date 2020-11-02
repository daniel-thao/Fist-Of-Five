import React, { useEffect, useState } from "react";

import dayJS from "dayjs";

import { populate } from "../routes/fistToFiveChoice";

import Section from "../components/regular/Section";

export default function UserAdmin() {
  const [fistToFive, setFistToFive] = useState({ updateState: [] });

  useEffect(function () {
    populate(setFistToFive);
  }, []);

  function populateDisplay() {
    // for (let i = 0; i < fistToFive.updateState.length; i++) {
    //   return (
    //     <div>
    //       {fistToFive.updateState[i][0]}
    //       {fistToFive.updateState[i].map(function(indexValues) {
    //         if (Number.isInteger(indexValues)) {
    //           return <p>{indexValues}</p>;
    //         }
    //       })}
    //     </div>
    //   );
    // }

    fistToFive.updateState.forEach(function (arr) {
      return <div>{arr.find((element) => typeof element === "string")}</div>;
    });
  }
  const date1 = dayJS("2020-11-25");
  let dateDiff = date1.diff(dayJS().format("YYYY-MM-DD"), "day");

  //   if (dateDiff > 3) {
  //     console.log("too great");
  //   }
  return (
    <div>
      {dayJS().format("YYYY-MM-DD")}
      {/* <p>{fistToFive.updateState[0]}</p> */}
      {populateDisplay()}
      {fistToFive.updateState.map(function (arr) {
        return (
          <Section>
            {arr[0]}
            {arr.map(function (indexValue) {
              return <Section>{typeof indexValue === "number" ? indexValue : ""}</Section>;
            })}
          </Section>
        );
      })}
    </div>
  );
}
