// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../../models");

// WE WILL EVENTUALLY NEED a jwt decoding thing here for when users come to use the appåd

// make the POST request
router.post("/", function (req, res) {
  // Create the chosen choice in the fist to Five collection
//   res.json({message: "HIHIHIH"})
  db.FistOfFive.create(req.body)
    // Then connect it to the specific user
    .then(function (dbFOFChoice) {
      //in here we are going to make another variable = the decoded req.body.token
      //Then we will eventually find the user and add this choice to their fist To Five list
      res.json(dbFOFChoice);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/", function (req, res) {
    // res.json({message: "JIJIJIIJIJI"})
  db.FistOfFive.find()
    .then(function (choices) {
      res.json(choices);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
