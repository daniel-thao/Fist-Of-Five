// We are requiring mongoose and the schema type constructor
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a User Schema
const FistOfFiveSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  systemDate: {
    type: Date,
    default: Date.now,
  },
});

// Then we need to export the schema
// Exporting the Variable Users which also = this new Fist of Five Schemaa
module.exports = FistOfFive = mongoose.model("FistOFive", FistOfFiveSchema);
