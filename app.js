var compression = require('compression');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

// Create the express server
var app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(compression());
app.use(cookieParser());
app.use('/swagger', swaggerUi.serve);

const URI =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@colincluster-wivqx.mongodb.net/SportsApp?retryWrites=true&w=majority`;

// Connect to MongoDB Atlas
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit("appStarted");
    console.log('MongoDB Atlas connection established successfully');
    return;
  })
  .catch(err => console.log(err));


  // Swagger set up
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Sporta App Documentation",
        version: "1.0.0",
        description:
          "COP 4331 Spring 2020 Group 22 Project"
      },
      servers: [
        {
          url: "http://localhost3000.us-east-2.elasticbeanstalk.com/"
        }
      ]
    },
    apis: ["./swagger.yaml"]
  };
  const specs = swaggerJsdoc(options);


var routes = require('./routes');

// User get login register and verification
app.post('/api/users/login', routes.postUserLogin);
app.post('/api/users/register', routes.postUserRegister);
app.get('/api/users/verify/:token', routes.getUserVerify);
app.get('/api/users/get', routes.getUser);
app.post('/api/emails/resendVerificationEmail', routes.resendVerificationEmail);
app.get('/api/users/logout', routes.getUserLogout);
app.get('/api/users/getUserAndDetail', routes.getUserAndDetail);
// User detail subdoc get and update
app.post('/api/users/detail/update', routes.postUserDetails);
app.get('/api/users/detail/get', routes.getUserDetails);
// Makes a golf match instance to add scores to, or sends back everything with get
app.post('/api/golf/createGolfMatch', routes.postGolfMatch);
app.get('/api/golf/getGolfMatch/:golfMatch', routes.getGolfMatch);
app.post('/api/golf/createHoleScore', routes.postGolfHoleScore);
app.post('/api/golf/updateHoleScore', routes.postGolfHoleScoreUpdate);
app.get('/api/golf/getGolfHole/:match/:hole', routes.getGolfHole);
app.get('/api/golf/getMyMatches', routes.getAllMatches);
// Making a golf bag, get a bags contents, and add or remove clubs
app.post('/api/golf/createGolfBag', routes.postGolfBag);
app.post('/api/golf/deleteGolfBag', routes.postGolfBagDelete);
app.post('/api/golf/getGolfBag', routes.getGolfBag); // needs to be made back to get with params
app.get('/api/golf/getAllGolfBags', routes.getAllGolfBags);
app.post('/api/golf/createGolfclub', routes.postGolfClubAdd);
app.post('/api/golf/deleteGolfclub', routes.postGolfClubDelete);
app.get('/api/golf/getGolfClub/:golfBag/:golfClub', routes.getGolfClub);
// Making an online even, then endpoints to join by sending a score, delete event, get results
app.post('/api/golf/createGolfEvent', routes.postGolfEvent);
app.post('/api/golf/postEventScore', routes.postGolfEventScore);
app.get('/api/golf/getMyEvents', routes.getAllMyEvents);
app.get('/api/golf/getEventResults/:event', routes.getEventResults);
app.get('/swagger', swaggerUi.setup(specs, { explorer: true}));

if (process.env.NODE_ENV === 'production') {
  const root = require('path').join(__dirname, 'build');
  console.log(root);
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  })
}

module.exports = app;
