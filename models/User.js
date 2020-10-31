// We are requiring mongoose and the schema type constructor
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  fistOfFive: [
    {
      type: Schema.Types.ObjectId,
      ref: "FistOfFive",
    },
  ],
});

const User = mongoose.model("users", UserSchema);

// Then we need to export the schema
// Exporting the Variable Users which also = this new UserSchema
module.exports = User;
