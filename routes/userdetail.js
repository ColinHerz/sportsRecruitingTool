const jwt = require('jsonwebtoken');
let User = require("../models/User");

exports.postUserDetails = async (req, res) => {

  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;
  const authToken = req.cookies.session;

  if (!isInteger(age) || age > 120 || age < 0)
    return res.status(400).json({ warning: "Use a proper age." });

  if (!isInteger(weight)|| weight < 0 || weight > 1200)
    return res.status(400).json({ warning: "Use a proper weight" });

  if (!isInteger(height) || height < 0 || height > 350)
    return res.status(400).json({ warning: "Use a proper height" });

  const userDetail = new userDetail({
    age,
    height,
    weight
  });

  jwt.verify(authToken, process.env.JWT_KEY, function (err, user){
    email = user.email;
    try{
    User.findOneAndUpdate({ "_id" : user._id, "userDetail._id" : user.userDetail._id}, {
        $set: {"userDetail.$" : userDetail}
    });
    }catch(e){
      return res.status(400).json({ warning: "Error Updating Fields." + id });
    }
  });
}

exports.getUserDetails = async (req,res) => {
  jwt.verify(authToken, process.env.JWT_KEY, function (err, user){
    email = user.email;
    User.findOne({email}).then(foundUser => {
      if (foundUser) {
        return foundUser.userDetail;
      }
      else
        return res.status(400).json({ warning: "Error in query" + id});
    });
  });
}
