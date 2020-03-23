const { getUserLogin, postUserRegister, getUserVerify } = require("./users");
const { resendVerificationEmail } = require("./emails");

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
