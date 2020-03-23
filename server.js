var compression = require('compression');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

require('dotenv').config();

// Create the express server
var app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(compression());

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
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Atlas connection established successfully'))
  .catch(err => console.log(err));

app.get('/testpoint', (req, res) => {
  res.json({
    text: "Tester testy test"
  })
});

var routes = require('./routes');
app.get('/users/login', routes.getUserLogin);
app.post('/users/register', routes.postUserRegister);
app.get('/users/verify/:token', routes.getUserVerify);
app.get('/emails/resendVerificationEmail', routes.resendVerificationEmail);

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
