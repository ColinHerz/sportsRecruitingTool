var compression = require('compression');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');

require('dotenv').config();

// Create the express server
var app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(compression());
app.use(cookieParser());

const URI =
  'mongodb+srv://' +
  process.env.DB_USER +
  ':' +
  process.env.DB_PASS +
  '@colincluster-wivqx.mongodb.net/SportsApp?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Atlas connection established successfully'))
  .catch(err => console.log(err));


var routes = require('./routes');

// User get login register and verification
app.post('/api/users/login', routes.postUserLogin);
app.post('/api/users/register', routes.postUserRegister);
app.get('/api/users/verify/:token', routes.getUserVerify);
app.get('/api/users/get', routes.getUser);
app.get('/api/emails/resendVerificationEmail', routes.resendVerificationEmail);
app.get('/api/users/logout', routes.getUserLogout);
// User detail subdoc get and update
app.post('/api/users/detail/update', routes.postUserDetails);
app.get('/api/users/detail/get', routes.getUserDetails);
// Makes a golf match instance to add scores to, or sends back everything with get
app.post('/api/golf/createGolfMatch', routes.postGolfMatch);
app.get('/api/golf/getGolfMatch/:golfMatch', routes.getGolfMatch);
app.post('/api/golf/createHoleScore', routes.postGolfHoleScore);
app.post('/api/golf/updateHoleScore', routes.postGolfHoleScoreUpdate);
app.get('/api/golf/getGolfHole/:hole/:match', routes.getGolfHole);
// Makes a unique golf course or finds it
app.post('/api/golf/createGolfCourse', routes.postGolfCourse);
app.post('/api/golf/getGolfCourse', routes.getGolfCourse); // needs to be made back to get with params
// Making a golf bag, get a bags contents, and add or remove clubs
app.post('/api/golf/createGolfBag', routes.postGolfBag);
app.post('/api/golf/deleteGolfBag', routes.postGolfBagDelete);
app.post('/api/golf/getGolfBag', routes.getGolfBag); // needs to be made back to get with params
app.get('/api/golf/getAllGolfBags', routes.getAllGolfBags);
app.post('/api/golf/createGolfclub', routes.postGolfClubAdd);
app.post('/api/golf/deleteGolfclub', routes.postGolfClubDelete);
app.get('/api/golf/getGolfClub/:golfClub/:golfBag', routes.getGolfClub);

if (process.env.NODE_ENV === 'production') {
  const root = require('path').join(__dirname, 'build');
  console.log(root);
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
