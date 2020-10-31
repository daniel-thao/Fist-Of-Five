import React, { useEffect, useState } from "react";

import dayJS from "dayjs";

export default function UserAdmin() {
  const [users, setUsers] = useState(["hi", 123, 24, 3, 53, 42, 3]);

  useEffect(function () {
    fetch("/api/user/adminReveal")
      .then(function (res) {
        return res.json();
      })
      .then(function (resJSON) {
        console.log(resJSON);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const date1 = dayJS("2020-11-25");
  let dateDiff = date1.diff(dayJS().format("YYYY-MM-DD"), "day")

  if(dateDiff > 3) {
      console.log("too great");
  }
  return <div>{dayJS().format("YYYY-MM-DD")}</div>;
}
