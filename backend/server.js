var compression = require('compression');
var express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');
var path = require('path');

require('dotenv').config();

// Create the express server
var app = express();
app.use(express.json());
app.use(helmet());
app.use(compression());

const URI =
  'mongodb+srv://' +
  process.env.DB_USER +
  ':' +
  process.env.DB_PASS +
  '@colincluster-wivqx.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Atlas connection established successfully'))
  .catch(err => console.log(err));


//var routes = require('./routes');
//app.post('/users/login', routes.postUserLogin);
//app.post('/users/register', routes.postUserRegister);
//app.post('/contacts/getAllContacts/:contact_for_user', routes.postContactsGetAll);
//app.post('/contacts/add/:contact_for_user', routes.postContactsAdd);
//app.post('/contacts/update/:id', routes.postContactsUpdate);
//app.post('/contacts/delete/:id', routes.postContactsDelete);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
