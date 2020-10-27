import React from "react";
import Button from "../regular/Button";

import { getFistToFive } from "../../routes/fistToFiveChoice";

export default function FistOfFiveChoice({ children, id, className, history, ...props }) {
  function checkBtnValue(btn) {
    console.log(btn.target.value);
    fetch("/api/fistToFive/", {
      method: "POST",
      body: JSON.stringify({
        number: btn.target.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (resJSON) {
        console.log(resJSON);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div id={id} className={className}>
      {children}
      <div className="btnGrid">
        <Button className="fist-of-five-button" value={props.dataNumber} onClick={checkBtnValue}>
          {props.dataNumber}
        </Button>
      </div>
    </div>
  );
}
