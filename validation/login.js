// This will Validate the Login info and Bring in the packages you need in order to make it work
// ---------
// This package confirms special formats of strings and other things
const Validator = require("validator");
// This checks to see if the data is empty
const empty = require("is-empty");

// Export a function that takes in "Front End data" as an argument
module.exports = function validateLoginInput(data) {
  // If there are errors, we will store them in here temporarily
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  // We are going to assume that the data has a property of email and passowrd
  // ----
  // This is a ternary if-statment -- if the statement before the "?" is true, do the thing before the colon -- if the statment before the "?" is false, do the thing after th colon
  // ----
  // Basically, if the data is not empty, keep it the same otherwise overwrite the seemingly empty data sent into an actual empty string
  data.email = !empty(data.email) ? data.email : "";
  data.password = !empty(data.password) ? data.password : "";

  // Here we will decide what to do with the changed property that occured up above
  // ----
  // Validator has these methods and it will double check to see if the data being sent is actually empty and if it is in email format, had to add the === portion here as well in order to get my code to work correctly
  if (Validator.isEmpty(data.email)) {
    errors.emailError = "Email field is required";
  } else if (Validator.isEmail(data.email) === false) {
    errors.emailError = "Email is invalid";
  }

  // Here we will do the same thing with the password
  if (Validator.isEmpty(data.password)) {
    errors.passwordError = "Password field is required";
  }

  // Here we will send back the errors object with whatever info we have on the recieved data and we will send a isValid property which should either be false or true, and the result we are looking for is true(which means that there were no errors)
  return {
    errors,
    isValid: empty(errors),
  };
};
