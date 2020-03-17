const {postUserLogin, postUserRegister, postUserVerify} = require("./users");

// User
exports.postUserLogin = async (req, res) => {
  await postUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
  await postUserRegister(req, res);
};
exports.postUserVerify = async (req, res) => {
  await postUserVerify(req, res);
};
