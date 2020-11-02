import React, { useEffect, useState } from "react";

import dayJS from "dayjs";

export default function UserAdmin() {
  const [users, setUsers] = useState(["hi", 123, 24, 3, 53, 42, 3]);
  const [fistToFive, setFistToFive] = useState([]);

  useEffect(function () {
    populate(setFistToFive);
  }, []);

  function populate(setFistToFive) {
    fetch("/api/user/adminReveal")
      .then(function (res) {
        return res.json();
      })
      .then(function (resJSON) {
        console.log(resJSON);

        const allUserChoicesAndNumbers = [];

        for (let i = 0; i < resJSON.length; i++) {
          const nameAndNumber = {};
          const choiceNumbers = [];
          for (let j = 0; j < resJSON[i].fistToFive.length; j++) {
            const fetchCall = fetch(`/api/fistToFive/${resJSON[i].fistToFive[j]}`)
            .then(function (response) {
              return response.json();
            }).then(function(responseJSON) {
                console.log(responseJSON);
            });
            // console.log(fetchCall);
          }
        }

        // for (let i = 0; i < resJSON.fistToFive.length; i++) {
        //   choiceNumbers.push(
        //     fetch(`/api/fistToFive/${resJSON.fistToFive[i]}`).then(function (response) {
        //       return response.json();
        //     })
        //   );
        // }

        Promise.all(allUserChoicesAndNumbers).then(function (updateState) {
          setFistToFive(updateState);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const date1 = dayJS("2020-11-25");
  let dateDiff = date1.diff(dayJS().format("YYYY-MM-DD"), "day");

  if (dateDiff > 3) {
    console.log("too great");
  }
  return (
    <div>
      {dayJS().format("YYYY-MM-DD")} <div>{fistToFive}</div>
    </div>
  );
}
