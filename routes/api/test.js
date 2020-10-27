// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// // Bring in the right database model structure
// const db = require("../models");

router.get("/", function (req, res) {
  res.json({ message: "JIJIJIIJIJI" });
});


module.exports = router;