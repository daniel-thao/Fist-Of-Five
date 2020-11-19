import React, {useRef} from "react";
import Button from "../regular/Button";

import { postFistToFive } from "../../routes/fistToFiveChoice";

// Importing Module.css files
import CSS from "../../pages/userPg.module.css"

export default function FistOfFiveChoice({ children, id, className, history, onMouseEnter, onMouseLeave, useRef, ...props }) {
  function checkBtnValue(btn) {
    console.log(btn.target.value);
    postFistToFive(btn);
  }

  return (
    <div ref={useRef} id={id} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}

        <Button className={`${CSS.buttons}`} value={props.dataNumber} onClick={checkBtnValue}>
          {props.dataNumber}
        </Button>

    </div>
  );
}
