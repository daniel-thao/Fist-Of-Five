// bring in the packages you need
// ------------------------------------
const express = require("express");
// extra security with bcrypt
const bcrypt = require("bcryptjs");
// This is to read the jwt tokens being sent from the front end
const jwt = require("jsonwebtoken");
// This is to get the "secret" needed for the jwt token methods
const keys = require("../../config/keys");
// This is to decode the jwt token back into it's original string information
const jwtDecode = require("jwt-decode");
// This is to validate special formats of the incoming data we are getting after getting decoded
const Validator = require("validator");

// Use the router extension of express to send info
const router = express.Router();

// // Load validation methods you created for the input data coming through this route
const validateRegistrationInput = require("../../validation/registration");
const validateLoginInput = require("../../validation/login");

// Load the User Model you created in the Models Folder
// const db = require("../../models");
const db = require("../../models");

// Decodes the token that the Front End will send to us. I guess this token has an id property
function deCoding(token) {
  const id = jwtDecode(token);
  return id.id;
}

/*


=============================================================================


*/

// REGISTRATION Post Method(Create a user basically)
router.post("/register", (req, res) => {
  // here we deconstruct the properties that this function gives us and the info that it is analyzing is the "Request's Body" of data
  const { errors, isValid } = validateRegistrationInput(req.body);

  // We WANT isValid to be true, so if it is false, we will send an error back to the front end
  if (!isValid) {
    return res.status(400).json({ error: errors });
  }

  // OTHERWISE go into the Database and the Collection of User
  db.User.findOne({ email: req.body.email })
    .then((user) => {
      // If the decoded JWT Token's user email matches something in the db, then send this error msg, OTHERWISE make a new user
      if (user) {
        const exists = "email already exists";
        return res.status(400).json({ error: { exists } });
      } else {
        const newUser = new db.User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        // Finally right before the confirmation, we will encrypt the password which we can decrypt using bcrypt's decoding process later when we need it
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

// LOGIN Post(pseudoGET) Method(NOT updating or creating anything, but need to send info to backend to dbl check and then GET)
// The reason we do a post here is because we are sending data from the front end to the backend EVEN though, we are just trying to GET the data from the backend, we need to send something from the front end to fact check stuff
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // we are going to see if we had any errors with the validationa and if we do, send back those errors BUT BUT BUT this does not actually stop the success action of this call even if the password is wrong
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Then since no error, we will compare the passwords sent with the data
  db.User.findOne({ email })
    .then((user) => {
      // Check if the user even exists in the db
      if (!user) {
        return res.status(404).json({ emailNotFound: "Email not found" });
      }

      // IF there is a user, then lets compare the incoming password to the existing password
      bcrypt.compare(password, user.password).then((isMatch) => {
        // If the password does match, then go ahead and do these things
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926,
            },
            (err, token) => {
              res.json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          return res.status(400).json({ passwordIncorrect: "Password incorrect" });
        }
      });
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

router.post("/adminCheck", (req, res) => {
  const id = req.body.id;
  // based on the id, check to see if there is a user in DB
  db.User.findOne({ _id: id })
    .then((user) => {
      // Check if the user even exists in the db
      if (!user) {
        return res.status(404).json({ notUser: "ALERT Fake Acc" });
      } else if (user.admin === false) {
        return res.json({ admin: false });
      } else if (user.admin === true) {
        return res.json({ admin: true });
      } else {
        return;
      }
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

router.get("/adminReveal", (req, res) => {
  db.User.find({})
    .then(function (user) {
      const nonAdminUsersAndChoices = [];
      for (i = 0; i < user.length; i++) {
        // console.log(user[i]);
        const userNameAndFistToFive = {};
        if (user[i].admin === false) {
          userNameAndFistToFive.name = user[i].name;
          userNameAndFistToFive.email = user[i].email;
          userNameAndFistToFive.fistToFive = user[i].fistToFive;
          nonAdminUsersAndChoices.push(userNameAndFistToFive);
        }
      }
      res.json(nonAdminUsersAndChoices);
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

router.get("/findAll/", (req, res) => {
  db.User.find({})
    .then(function (user) {
      const nonAdminUsersAndChoices = [];
      for (i = 0; i < user.length; i++) {
        if (user[i].admin === false) {
          nonAdminUsersAndChoices.push(user[i]);
        }
      }
      res.json(nonAdminUsersAndChoices);
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

router.post("/findOneUser/", (req, res) => {
  // console.log(req.body);
  db.User.find({ email: req.body.email })
    .then(function (user) {
      res.json(user);
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

router.delete("/deleteOneUser/", (req, res) => {
  // console.log(req.body);
  db.User.deleteOne({ email: req.body.email })
    .then(function (user) {
      res.json(user);
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

/*


=============================================================================


*/

router.put("/updateUserChoiceArr", (req, res) => {
  // console.log(req.body);
  // console.log(req.body.arr);
  db.User.updateOne({ _id: req.body.id } ,{$set: {fistToFive : req.body.arr}})
    .then(function (choiceArr) {
      res.json(choiceArr);
    })
    .catch((err) => console.error(`Delete failed with error: ${err}`));
});

module.exports = router;
