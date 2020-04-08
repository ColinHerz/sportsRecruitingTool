const { getUserLogin, postUserRegister, getUserVerify, getUser } = require("./users");
const { resendVerificationEmail } = require("./emails");
const { postUserDetails } = require("./userdetail");
const { postGolfMatch, getGolfMatch } = require("./GolfRoutes/GolfMatch");
const { postGolfCourse, getGolfCourse } = require("./GolfRoutes/GolfCourse");
const { postGolfBag, postGolfBagDelete, getGolfBag, getAllGolfBags, postGolfClubAdd, postGolfClubDelete } = require("./GolfRoutes/GolfBag");

exports.getUserLogin = async (req, res) => {
  await getUserLogin(req, res);
};
exports.postUserRegister = async (req, res) => {
  await postUserRegister(req, res);
};
exports.getUserVerify = async (req, res) => {
  await getUserVerify(req, res);
};
exports.getUser = async (req, res) => {
  await getUser(req, res);
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
exports.postGolfMatch = async (req, res) => {
  await postGolfMatch(req, res);
};
exports.getGolfMatch = async (req, res) => {
  await getGolfMatch(req, res);
};
exports.postGolfCourse = async (req, res) => {
  await postGolfCourse(req, res);
};
exports.getGolfCourse = async (req, res) => {
  await getGolfCourse(req, res);
};
exports.postGolfBag = async (req, res) => {
  await postGolfBag(req, res);
};
exports.postGolfClubAdd = async (req, res) => {
  await postGolfClubAdd(req, res);
};
exports.postGolfClubDelete = async (req, res) => {
  await postGolfClubDelete(req, res);
};
exports.getGolfBag = async (req, res) => {
  await getGolfBag(req, res);
};
exports.getAllGolfBags = async (req, res) => {
  await getAllGolfBags(req, res);
};
exports.postGolfBagDelete = async (req, res) => {
  await postGolfBagDelete(req, res);
};
