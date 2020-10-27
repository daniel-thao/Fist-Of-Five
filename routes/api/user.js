// // bring in the packages you need
// // ------------------------------------
// const express = require("express");
// // extra security with bcrypt
// const bcrypt = require("bcryptjs");
// // This is to read the jwt tokens being sent from the front end
// const jwt = require("jsonwebtoken");
// // This is to get the "secret" needed for the jwt token methods
// const keys = require("../config/keys");
// // This is to decode the jwt token back into it's original string information
// const jwtDecode = require("jwt-decode");
// // This is to validate special formats of the incoming data we are getting after getting decoded
// const Validator = require("validator");

// // Use the router extension of express to send info
// const router = express.Router();

// // Load validation methods you created for the input data coming through this route
// const validateRegistrationInput = require("../validation/registration");
// const validateLoginInput = require("../validation/login");

// // Load the User Model you created in the Models Folder
// const db = require("../../models");


// // Decodes the token that the Front End will send to us. I guess this token has an id property
// function deCoding(token) {
//   const id = jwtDecode(token);
//   return id.id;
// }

// // ----------------------------------------
// // REGISTRATION Post Method(Create a user basically)
// router.post("/register", (req, res) => {
//   // here we deconstruct the properties that this function gives us and the info that it is analyzing is the "Request's Body" of data
//   const { errors, isValid } = validateRegistrationInput(req.body);

//   // We WANT isValid to be true, so if it is false, we will send an error back to the front end
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   // OTHERWISE go into the Database and the Collection of User
//   db.User.findOne({ email: req.body.email }).then((user) => {
//     // If the decoded JWT Token's user email matches something in the db, then send this error msg, OTHERWISE make a new user
//     if (user) {
//       return res.status(400).json({ email: "email already exists" });
//     } else {
//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         passwrod: req.body.password,
//       });

//       // Finally right before the confirmation, we will encrypt the password which we can decrypt using bcrypt's decoding process later when we need it
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then((user) => res.json(user))
//             .catch((err) => console.log(err));
//         });
//       });
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body);

//   // we are going to see if we had any errors with the validationa and if we do, send back those errors
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const email = req.body.email;
//   const password = req.body.password;

//   // Then since no error, we will compare the passwords sent with the data
//   db.User.findOne({ email }).then((user) => {
//     // Check if the user even exists in the db
//     if (!user) {
//       return res.status(404).json({ emailNotFound: "Email not found" });
//     }

//     // IF there is a user, then lets compare the incoming password to the existing password
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       // If the password does match, then go ahead and do these things
//       if (isMatch) {
//         const payload = {
//           id: user.id,
//           name: user.name,
//         };
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           {
//             expiresIn: 31556926,
//           },
//           (err, token) => {
//             res.json({ success: true, token: "Bearer " + token });
//           }
//         );
//       } else {
//         return res.status(400).json({ passwordIncorrect: "Password incorrect" });
//       }
//     });
//   });
// });

