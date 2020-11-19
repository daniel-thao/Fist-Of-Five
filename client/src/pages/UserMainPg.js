import React, { useContext, useRef, useState } from "react";
// import { CSSTransition } from "react-transition-group";

// Bring in the REGULAR Components
import Section from "../components/regular/Section";

// Import the CSS
import "./main.css";
import "./transition.css";

//Import ModuleCSS
import CSS from "./userPg.module.css";

// Import Assets
import title from "../assets/FistToFive.png";

// Import authorization context
import { AuthContext } from "../routes/authentication/userAuth";

// This is the route to post the info for hitting the button
import { postFistToFive } from "../routes/fistToFiveChoice";

export default function UserMainPg() {
  // This is importing the method from the context
  const { logoutUser } = useContext(AuthContext);

  // This is to makesure that a user can't spam the buttons, they can only spam every three seconds
  const [isChoiceClicked, setIsChoiceClicked] = useState(false);

  // Need this State to managa the messages to the user
  const [message, setMessage] = useState(
    "This will help us provide better support moving forward in the class!"
  );

  const btn0 = useRef();
  const btn1 = useRef();
  const btn2 = useRef();
  const btn3 = useRef();
  const btn4 = useRef();
  const btn5 = useRef();

  const choiceData = [
    { reactRef: btn0, class: `choiceZero`, number: 0 },
    { reactRef: btn1, class: `choiceOne`, number: 1 },
    { reactRef: btn2, class: `choiceTwo`, number: 2 },
    { reactRef: btn3, class: `choiceThree`, number: 3 },
    { reactRef: btn4, class: `choiceFour`, number: 4 },
    { reactRef: btn5, class: `choiceFive`, number: 5 },
  ];

  function checkBtnValue(btn) {
    // If the global state boolean is false do this
    if (!isChoiceClicked) {
      // Post the value to the DB in relation to the user
      postFistToFive(btn);

      // Let user know that they chose a value
      setMessage("Thank you, for choosing a value");

      // change Boolean value to TRUE that the user did click a value
      setIsChoiceClicked(true);

      // Then set a time limit on when they can choose another value
      setTimeout(function () {
        // Once the timer is reached, change the boolean back to false to reflect that the new did not choose a value yet
        setIsChoiceClicked(false);

        // Let the user know that they can choose another value
        setMessage("You may now choose another value");
      }, 5000);
      // If they are spamming values, send this message to the user
    } else {
      setMessage("Sorry, please wait a few moments before choosing another value");
    }
  }

  // Had to make this in order to attach useRef to components, but this lives only in here, and no where, else --> Haven't found a way to import/export this from another JS file yet.
  const FistChoice = React.forwardRef((props, ref) => {
    return (
      <div
        ref={ref}
        id={props.id}
        className={props.className}
        datanumber={props.datanumber}
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
      >
        <div className="btnGrid">
          <button className={`${CSS.buttons}`} value={props.datanumber} onClick={checkBtnValue}>
            {props.datanumber}
          </button>
        </div>
      </div>
    );
  });

  // ============================================================
  // These functions are used to add and remove classes from the buttons

  // The argument is meant to be an array
  function addClassToOtherBtns(buttonRefs, exceptionBtn) {
    // This Var is to compare the forloop variable to
    const compare = buttonRefs.indexOf(exceptionBtn);

    // This hosts the new css classes that we want, in order
    const hideOtherButtonsArr = [];

    // For loop in order to populate the new array with
    for (let i = 0; i < buttonRefs.length; i++) {
      if (i !== compare) {
        hideOtherButtonsArr.push(CSS.hide);
        // console.log(buttonRefs[i])
        buttonRefs[i].classList.remove(CSS.show);
        buttonRefs[i].classList.add(CSS.hide);
      } else {
        hideOtherButtonsArr.push(CSS.show);
      }
    }
  }

  function removeClassToOtherBtns(buttonRefs) {
    const showAllBtns = [];

    for (let i = 0; i < buttonRefs.length; i++) {
      showAllBtns.push(CSS.show);
      buttonRefs[i].classList.remove(CSS.hide);
      buttonRefs[i].classList.add(CSS.show);
    }
  }
  // ============================================================

  // ============================================================

  function enterBtn(event) {
    const btnRefs = [
      btn0.current,
      btn1.current,
      btn2.current,
      btn3.current,
      btn4.current,
      btn5.current,
    ];
    // console.log(event.currentTarget);
    switch (event.currentTarget) {
      case btn0.current:
        return addClassToOtherBtns(btnRefs, btn0.current);
      case btn1.current:
        return addClassToOtherBtns(btnRefs, btn1.current);
      case btn2.current:
        return addClassToOtherBtns(btnRefs, btn2.current);
      case btn3.current:
        return addClassToOtherBtns(btnRefs, btn3.current);
      case btn4.current:
        return addClassToOtherBtns(btnRefs, btn4.current);
      case btn5.current:
        return addClassToOtherBtns(btnRefs, btn5.current);
      default:
        return console.log("nothing hovered");
    }
  }

  function leaveBtn(event) {
    const btnRefs = [
      btn0.current,
      btn1.current,
      btn2.current,
      btn3.current,
      btn4.current,
      btn5.current,
    ];
    switch (event.currentTarget) {
      case btn0.current:
        return removeClassToOtherBtns(btnRefs);
      case btn1.current:
        return removeClassToOtherBtns(btnRefs);
      case btn2.current:
        return removeClassToOtherBtns(btnRefs);
      case btn3.current:
        return removeClassToOtherBtns(btnRefs);
      case btn4.current:
        return removeClassToOtherBtns(btnRefs);
      case btn5.current:
        return removeClassToOtherBtns(btnRefs);
      default:
        return console.log("nothing hovered");
    }
  }
  // ============================================================

  return (
    <div className={`${CSS.background}`}>
      <img
        className={CSS.imgBackdrop}
        src={
          "https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwMjc5NH0&auto=format&fit=crop&w=1369&q=80"
        }
      ></img>
      <button className={`${CSS.zIndex3} ${CSS.logoutBtn}`} onClick={logoutUser}>
        Logout
      </button>

      <div className="background">
        <Section className={CSS.positionRelative}>
          {/* <h1 className="title">Fist of Five</h1> */}
          <img className="title" src={title} alt="Fist To Five"></img>
          <h2 className="userNotice">We value your privacy.</h2>
          <h2 className="userNotice">
            Only the Instructional team will be able to see the choice you make.
          </h2>
          <h2 className="userNotice">{message}</h2>
        </Section>

        <Section>
          <div className={`${CSS.btnSection}`}>
            {/* Can do some mapping here instead of repeating the code 5 times, I can figure it out */}

            {choiceData.map((index) => {
              return (
                <FistChoice
                  key={index.class}
                  ref={index.reactRef}
                  className={index.class}
                  datanumber={index.number}
                  onMouseOver={enterBtn}
                  onMouseLeave={leaveBtn}
                ></FistChoice>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
