import React from "react";
import Button from "../regular/Button";

import { postFistToFive } from "../../routes/fistToFiveChoice";

// Importing Module.css files
import CSS from "../../pages/userPg.module.css"

export default function FistOfFiveChoice({ children, id, className, history, onMouseEnter, onMouseLeave, ...props }) {
  function checkBtnValue(btn) {
    console.log(btn.target.value);
    postFistToFive(btn);
  }

  return (
    <div id={id} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <div className="btnGrid">
        <Button className={`fist-of-five-button ${CSS.logoutBtn}`} value={props.dataNumber} onClick={checkBtnValue}>
          {props.dataNumber}
        </Button>
      </div>
    </div>
  );
}
