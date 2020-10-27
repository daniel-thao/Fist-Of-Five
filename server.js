// Require all the packages that we need
// Express for server
const express = require("express");
// Database ORM for Mongo
const mongoose = require("mongoose");
// Security through JWT
const passport = require("passport");
// Getting folder paths in computer
const path = require("path");
// parsing the data into things that the database and client can read
const bodyParser = require("body-parser");

// reference your routes in your folder system
const FOF = require("./routes/api/fistToFive");
const user = require("./routes/api/user");
const test = require("./routes/api/test");

// construct the server walkway
const app = express();

// bodyParser middleware for Express
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Usually would put a env variable for prod or dev here just in case, but not going to be using during this development

// Configure the DB variable to the database in Mongo Atlas cloud
const db = require("./config/keys").mongoURI;

// Actually connect to the database via Mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Now init Passport middleware for future User validation
app.use(passport.initialize());

// // Now use Passport to check the JWT tokens that we are using in order to check if the user is accurate and in the DB and then compare the results to the contents of the DB
require("./config/passport")(passport);

// Now bring in your routes
// ------
// app.use("/api/user", user);
app.use("/api/fistToFive", FOF);
app.use("/api/test/", test);
// ------

// This is the back up plan if routes aren't matched at all with the code set up above
app.use("*", (req, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));


// Set up the PORT that this app will run on

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`\n\n Server up and runnign on port ${port} \n\n`));