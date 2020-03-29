const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserDetail = require("./UserSubModels/UserDetail");
let UserEquipment = require("./UserSubModels/UserEquipment");
let UserFavorite = require("./UserSubModels/UserFavorite");
let UserSports = require("./UserSubModels/UserSports");

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
    type: Boolean,
    required: true
  },
  userDetail: UserDetail.schema,
  userFavorite: UserFavorite.schema,
  userEquipment: UserEquipment.schema,
  userSports: UserSports.schema
});

const User = mongoose.model("User", userSchema);

module.exports = User;
