let User = require("../models/User");

exports.postUserLogin = async (req, res) => {
    console.log('hi');
    res.json({
        text:"Tester testy login"
    })
};

exports.postUserRegister = async (req, res) => {
    res.json({
        text:"Tester testy register"
    })
};

exports.postUserVerify = async (req, res) => {
    res.json({
        text:"Tester testy verify"
    })
};
