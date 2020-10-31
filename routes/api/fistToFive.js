// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../../models");

// need to bring in the jwt-decoding npm package
const jwtDecode = require("jwt-decode")

// then create a seperate function that decodes the argument coming in, which we are expecting it to be a token
function deCoding(token) {
  const id = jwtDecode(token);
  return id.id;
}

// WE WILL EVENTUALLY NEED a jwt decoding thing here for when users come to use the appåd

// make the POST request
router.post("/", function (req, res) {
  // Create the chosen choice in the fist to Five collection
//   res.json({message: "HIHIHIH"})
  db.FistToFive.create(req.body)
    // Then connect it to the specific user
    .then(function (dbFOFChoice) {
      const userID = deCoding(req.body.token);
      //in here we are going to make another variable = the decoded req.body.token
      //Then we will eventually find the user and add this choice to their fist To Five list
      return db.User.findOneAndUpdate({ _id: userID }, { $push: { fistToFive: dbFOFChoice._id } }, { new: true });
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/", function (req, res) {
    // res.json({message: "JIJIJIIJIJI"})
  db.FistToFive.find()
    .then(function (choices) {
      res.json(choices);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// This is just to reset the db
router.delete("/", function(req,res) {
  db.FistToFive.deleteMany({}).then(function(nodata) {
    res.json(nodata);
  })
})
module.exports = router;
