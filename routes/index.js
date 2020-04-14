const { getUserLogin, postUserRegister, getUserVerify, getUser, getUserLogout, getUserAndDetial} = require("./users");
const { resendVerificationEmail } = require("./emails");
const { postUserDetails } = require("./userdetail");
const { postGolfMatch, getGolfMatch, postGolfHoleScore, postGolfHoleScoreUpdate, getGolfHole, getAllMatches } = require("./GolfRoutes/GolfMatch");
const { postGolfCourse, getGolfCourse } = require("./GolfRoutes/GolfCourse");
const { postGolfBag, postGolfBagDelete, getGolfBag, getAllGolfBags, postGolfClubAdd, postGolfClubDelete, getGolfClub } = require("./GolfRoutes/GolfBag");
const { postGolfEvent, postGolfEventScore, getAllMyEvents, getEventResults } = require("./GolfRoutes/GolfEvents");

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
exports.getUserAndDetial = async (req, res) => {
  await getUserAndDetial(req, res);
};

