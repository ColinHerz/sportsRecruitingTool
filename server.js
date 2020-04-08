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
app.get('/api/users/login', routes.getUserLogin);
app.post('/api/users/register', routes.postUserRegister);
app.get('/api/users/verify/:token', routes.getUserVerify);
app.get('/api/users/get', routes.getUser);
app.get('/api/emails/resendVerificationEmail', routes.resendVerificationEmail);
// User detail subdoc get and update
app.post('/api/users/detail/update', routes.postUserDetails);
app.get('/api/users/detail/get', routes.getUserDetails);
// Makes a golf match instance to add scores to, or sends back everything with get
app.post('/api/golf/createGolfMatch', routes.postGolfMatch);
app.get('/api/golf/getGolfMatch', routes.getGolfMatch);
// Makes a unique golf course or finds it
app.post('/api/golf/createGolfCourse', routes.postGolfCourse);
app.get('/api/golf/getGolfCourse', routes.getGolfCourse);
// Making a golf bag, get a bags contents, and add or remove clubs
app.post('/api/golf/createGolfBag', routes.postGolfBag);
app.post('/api/golf/deleteGolfBag', routes.postGolfBagDelete);
app.get('/api/golf/getGolfBag', routes.getGolfBag);
app.get('/api/golf/getAllGolfBags', routes.getAllGolfBags);
app.post('/api/golf/createGolfclub', routes.postGolfClubAdd);
app.post('/api/golf/deleteGolfclub', routes.postGolfClubDelete);

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
