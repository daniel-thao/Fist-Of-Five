import React from "react";
import Button from "../regular/Button";

export default function FistOfFiveChoice({ children, id, className, history, ...props }) {
  function checkBtnValue(btn) {
    console.log(btn.target.value);
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
