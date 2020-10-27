import React, { useState } from "react";
// import { CSSTransition } from "react-transition-group";

// Bring in the REGULAR Components
import Section from "../components/regular/Section";

// Bring in the UNIQUE Components
import FistOfFiveChoice from "../components/unique/FistOfFiveChoice";

// Import the CSS
import "./main.css";
import "./transition.css";

// Import Assets
import title from "../assets/FistToFive.png";

export default function UserMainPg() {
  // For the CSS Transition package we need a state
  // const [bgAni, setBgAni] = useState(true);
  return (
    <>
      {/* <CSSTransition
        in={bgAni}
        appear={true}
        timeout={1000}
        classNames="fade"
        onEnter={() => setBgAni(false)}
        // onExit={() => setBgAni(true)}
      > */}
      <div className="background">
        <div></div>
        <Section>
          {/* <h1 className="title">Fist of Five</h1> */}
          <img className="title" src={title} alt="Fist To Five"></img>
          <h2 className="userNotice">We value your privacy.</h2>
          <h2 className="userNotice">
            Only the Instructional team will be able to see the choice you make.
            <br></br>
            <br></br>
            This will help us provide better support moving forward in the class!
          </h2>
        </Section>
        <Section>
          <div className="grid">
          <FistOfFiveChoice className="choiceZero" dataNumber="0"></FistOfFiveChoice>
          <FistOfFiveChoice className="choiceOne" dataNumber="1"></FistOfFiveChoice>
          <FistOfFiveChoice className="choiceTwo" dataNumber="2"></FistOfFiveChoice>
          <FistOfFiveChoice className="choiceThree" dataNumber="3"></FistOfFiveChoice>
          <FistOfFiveChoice className="choiceFour" dataNumber="4"></FistOfFiveChoice>
          <FistOfFiveChoice className="choiceFive" dataNumber="5"></FistOfFiveChoice>
          </div>
        </Section>
      </div>
      {/* </CSSTransition> */}
    </>
  );
}
