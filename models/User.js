const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
    unique: false
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    unique: false
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    unique: false
  },
  isVerified: {
    type: Boolean
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
