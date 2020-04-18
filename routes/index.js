<<<<<<< HEAD
const { postUserLogin, postUserRegister, getUserVerify, getUser, getUserLogout, getUserAndDetial} = require("./users");
=======

const { postUserLogin, postUserRegister, getUserVerify, getUser, getUserLogout, getUserAndDetail} = require("./users");
>>>>>>> f7f39003a378de5c3573d96ca5549dc471a154dc
const { resendVerificationEmail } = require("./emails");
const { getUserDetails, postUserDetails } = require("./userdetail");
const { postGolfMatch, getGolfMatch, postGolfHoleScore, postGolfHoleScoreUpdate, getGolfHole, getAllMatches } = require("./GolfRoutes/GolfMatch");
const { postGolfBag, postGolfBagDelete, getGolfBag, getAllGolfBags, postGolfClubAdd, postGolfClubDelete, getGolfClub } = require("./GolfRoutes/GolfBag");
const { postGolfEvent, postGolfEventScore, getAllMyEvents, getEventResults } = require("./GolfRoutes/GolfEvents");

exports.postUserLogin = async (req, res) => {
  await postUserLogin(req, res);
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
exports.postGolfMatch = async (req, res) => {
  await postGolfMatch(req, res);
};
exports.getGolfMatch = async (req, res) => {
  await getGolfMatch(req, res);
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
exports.postGolfHoleScore = async (req, res) => {
  await postGolfHoleScore(req, res);
};
exports.getGolfClub = async (req, res) => {
  await getGolfClub(req, res);
};
exports.getGolfHole = async (req, res) => {
  await getGolfHole(req, res);
};
exports.postGolfHoleScoreUpdate = async (req, res) => {
  await postGolfHoleScoreUpdate(req, res);
};
exports.getUserLogout = async (req, res) => {
  await getUserLogout(req, res);
};
exports.postGolfEvent = async (req, res) => {
  await postGolfEvent(req, res);
};
exports.postGolfEventScore = async (req, res) => {
  await postGolfEventScore(req, res);
};
exports.getAllMatches = async (req, res) => {
  await getAllMatches(req, res);
};
exports.getAllMyEvents = async (req, res) => {
  await getAllMyEvents(req, res);
};
exports.getEventResults = async (req, res) => {
  await getEventResults(req, res);
};
exports.getUserAndDetail = async (req, res) => {
  await getUserAndDetail(req, res);
};
