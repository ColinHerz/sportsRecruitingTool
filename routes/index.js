const { postUserLogin, postUserRegister, getUserVerify } = require("./users");

// User
exports.postUserLogin = async (req, res) => {
  await postUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
  await postUserRegister(req, res);
};
exports.getUserVerify = async (req, res) => {
  await getUserVerify(req, res);
};
