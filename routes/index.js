const { getUserLogin, postUserRegister, getUserVerify } = require("./users");
const { resendVerificationEmail } = require("./emails");
const { postUserDetails } = require("./userdetail");

// User
exports.getUserLogin = async (req, res) => {
  await getUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
  await postUserRegister(req, res);
};
exports.getUserVerify = async (req, res) => {
  await getUserVerify(req, res);
};
exports.resendVerificationEmail = async (req, res) => {
  await resendVerificationEmail(req, res);
};
exports.postUserDetails = async (req, res) => {
  await postUserDetails(req, res);
};
exports.getUserDetails = async (req, res) => {
  await getUserDetails(req, res);
};

exports.postUserDetails = async (req, res) => {
  await postUserDetails(req, res);
};
