import React, { useContext, useRef } from "react";
// import { CSSTransition } from "react-transition-group";

// Bring in the REGULAR Components
import Section from "../components/regular/Section";

// Bring in the UNIQUE Components
import FistOfFiveChoice from "../components/unique/FistOfFiveChoice";

// Import the CSS
import "./main.css";
import "./transition.css";

//Import ModuleCSS
import CSS from "./userPg.module.css";

// Import Assets
import title from "../assets/FistToFive.png";

// Import authorization context
import { AuthContext } from "../routes/authentication/userAuth";

export default function UserMainPg() {
  // For the CSS Transition package we need a state
  // const [bgAni, setBgAni] = useState(true);
  const { logoutUser } = useContext(AuthContext);
  const imgZero = useRef();
  const imgOne = useRef();
  const imgTwo = useRef();
  const imgThree = useRef();
  const imgFour = useRef();
  const imgFive = useRef();

  function displayImg(event) {
    // console.log(event.currentTarget.className);

    switch (event.currentTarget.className) {
      case "choiceZero":
        imgZero.current.classList.remove(CSS.hide);
        return imgZero.current.classList.add(CSS.show);
      case "choiceOne":
        imgOne.current.classList.remove(CSS.hide);
        return imgOne.current.classList.add(CSS.show);
      case "choiceTwo":
        imgTwo.current.classList.remove(CSS.hide);
        return imgTwo.current.classList.add(CSS.show);
      case "choiceThree":
        imgThree.current.classList.remove(CSS.hide);
        return imgThree.current.classList.add(CSS.show);
      case "choiceFour":
        imgFour.current.classList.remove(CSS.hide);
        return imgFour.current.classList.add(CSS.show);
      case "choiceFive":
        imgFive.current.classList.remove(CSS.hide);
        return imgFive.current.classList.add(CSS.show);
      default:
        return console.log("hi");
    }
  }

  function hideImg(event) {
    console.log(event.currentTarget.className);
    switch (event.currentTarget.className) {
      case "choiceZero":
        imgZero.current.classList.remove(CSS.show);
        return imgZero.current.classList.add(CSS.hide);
      case "choiceOne":
        imgOne.current.classList.remove(CSS.show);
        return imgOne.current.classList.add(CSS.hide);
      case "choiceTwo":
        imgTwo.current.classList.remove(CSS.show);
        return imgTwo.current.classList.add(CSS.hide);
      case "choiceThree":
        imgThree.current.classList.remove(CSS.show);
        return imgThree.current.classList.add(CSS.hide);
      case "choiceFour":
        imgFour.current.classList.remove(CSS.show);
        return imgFour.current.classList.add(CSS.hide);
      case "choiceFive":
        imgFive.current.classList.remove(CSS.show);
        return imgFive.current.classList.add(CSS.hide);
      default:
        return console.log("hi");
    }
  }
  return (
    <>
      <div className={`${CSS.background}`}>
        <button className={`${CSS.logoutBtn}`} onClick={logoutUser}>
          Logout
        </button>
        <div className="background">
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
              <div ref={imgZero} className={`${CSS.hide} imgZero ${CSS.imgParams}`}>
                <img className={`title`} src={title}></img>
              </div>

              <FistOfFiveChoice
                className="choiceZero"
                dataNumber="0"
                onMouseEnter={displayImg}
                onMouseLeave={hideImg}
              ></FistOfFiveChoice>

              <div ref={imgOne} className={`${CSS.hide} imgOne ${CSS.imgParams}`}>
                <img className={`title`} src={title}></img>
              </div>
              <FistOfFiveChoice
                className="choiceOne"
                dataNumber="1"
                onMouseEnter={displayImg}
                onMouseLeave={hideImg}
              ></FistOfFiveChoice>

              <div ref={imgTwo} className={`${CSS.hide} imgTwo ${CSS.imgParams}`}>
                <img className={`title`} src={title}></img>
              </div>
              <FistOfFiveChoice
                className="choiceTwo"
                dataNumber="2"
                onMouseEnter={displayImg}
                onMouseLeave={hideImg}
              ></FistOfFiveChoice>

              <div ref={imgThree} className={`${CSS.hide} imgThree ${CSS.imgParams}`}>
                <img className={`title`} src={title}></img>
              </div>

              <FistOfFiveChoice
                className="choiceThree"
                dataNumber="3"
                onMouseEnter={displayImg}
                onMouseLeave={hideImg}
              ></FistOfFiveChoice>

              <div ref={imgFour} className={`${CSS.hide} imgFour ${CSS.imgParams}`}>
                <img className={`title`} src={title}></img>
              </div>

              <FistOfFiveChoice
                className="choiceFour"
                dataNumber="4"
                onMouseEnter={displayImg}
                onMouseLeave={hideImg}
              ></FistOfFiveChoice>

              <div ref={imgFive} className={`${CSS.hide} imgFive ${CSS.imgParams}`}>
                <img className={`title`} src={title}></img>
              </div>

              <FistOfFiveChoice
                className="choiceFive"
                dataNumber="5"
                onMouseEnter={displayImg}
                onMouseLeave={hideImg}
              ></FistOfFiveChoice>
            </div>
          </Section>
        </div>

        {/* <div className={CSS.imgParams}>
          <img src="https://images.unsplash.com/photo-1588654364310-34cbc935f792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"></img>
        </div> */}
      </div>
    </>
  );
}
