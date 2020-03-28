const jwt = require('jsonwebtoken');
let User = require("../models/User");
let UserDetail = require("../models/UserSubModels/UserDetail");

exports.postUserDetails = async (req, res) => {
  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;
  const authToken = req.cookies.session;

  if (typeof age != "number" || age > 120 || age < 0)
    return res.status(400).json({ warning: "Use a proper age." });

  if (typeof weight != "number" || weight < 0 || weight > 1200)
    return res.status(400).json({ warning: "Use a proper weight" });

  if (typeof height != "number" || height < 0 || height > 350)
    return res.status(400).json({ warning: "Use a proper height" });

  const userDetail = new UserDetail({
    age,
    height,
    weight
  });

  jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
    const filter = { _id: user.id };
    const update = { userDetail: userDetail };
    User.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true // Make this update into an upsert
    }).then(detail => {
      if (!detail) {
        return res.status(400).json({ warning: "User Not Found" });
      }
      else {
        res.status(200).json({ success: true });
      }
    }).catch(err => res.status(500).json("Error" + err));
  });
}

exports.getUserDetails = async (req, res) => {
  jwt.verify(authToken, process.env.JWT_KEY, function (err, user) {
    const filter = { _id: user.id };
    const details = { userDetail: userDetail };
    User.findOneAndUpdate(filter, details).then(query => {
      if (!query) {
        return res.status(400).json({ warning: "User Not Found" });
      }
      else {
        res.status(200).json({ userDetail });
      }
    }).catch(err => res.status(500).json("Error" + err));
  });
}
