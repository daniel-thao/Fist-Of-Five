// This will validate the info for the registration
const Validator = require("validator");
const empty = require("is-empty");

// export this function
module.exports = function validateRegistrationInput(data) {
  let errors = {};

  console.log(data.name, data.email, data.password, data.confirmPwd);

  // We will convert seemingly empty data into actual empty data
  // We will also assume that it will have the properties of name // email // password // confirmPwd
  data.name = !empty(data.name) ? data.name : "";
  data.email = !empty(data.email) ? data.email : "";
  data.password = !empty(data.password) ? data.password : "";
  data.confirmPwd = !empty(data.confirmPwd) ? data.confirmPwd : "";

  // Using Validator Package, we will do another round of checks and balances
  // if it the name field is empty, send this error msg
  if (Validator.isEmpty(data.name)) {
    errors.name= "Name field is required";
  }

  // If the email field is empty or if it isn't in email format, send this error msg
  if (Validator.isEmpty(data.email)) {
    errors.email= "Email Field is required";
  } else if (Validator.isEmail(data.email)) {
    errors.email= "Email is invalid";
  }

  // If the first passwrod field is empty, send this error msg
  if (Validator.isEmpty(data.password)) {
    errors.password= "Password field is required";
  }
  // If the first password field is too short or too lnog, send this error msg
  else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password= " Password must be at least 6 characters and no more than 30";
  }

  // If the second password field is empty, send this error msg
  if (Validator.isEmpty(data.confirmPwd)) {
    errors.confirmPwd= "Confirm password field is required";
  }

  // If the two password fields don't match, send this error msg
  if (!Validator.equals(data.password, data.confirmPwd)) {
    errors.confirmPwd= "passwords must match";
  }

  // Finally send the errors object and an isValid prop that will see if it is true or false
  return {
    errors,
    isValid: empty(errors),
  };
};
