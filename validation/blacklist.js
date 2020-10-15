// This will help make sure that the data being sent is sanitized, but I'm not using it right now
// I will bring this part in later
// -----
// Bring in the right pacakages
const Validator = require("validator");
const empty = require("is-empty");

module.exports = function validateInfoChange(data) {
    let errors = {};

    // Convert seemingly empty data into actual empty strings
    data.name = !empty(data.name) ? data.name : "";
    data.email = !empty(data.email) ? data.email : "";
    data.password = !empty(data.password) ? data.password : "";

    // 
}