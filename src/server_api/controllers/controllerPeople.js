var crypto = require('crypto');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res){
  if (req.body.username || req.body.password){
    var username = req.body.username;
    var password = req.body.password;
    Person.findOne({username:username}, function (err, person) {
      if (err){
        sendJsonResponse(res, 400, err);
      } else {
        console.log(person);
        if (password === person.password){
          sendJsonResponse(res, 200, person);
        } else {
          sendJsonResponse(res, 400, {"message":"Invalid password"});
        }
      }
    });
  } else {
    sendJsonResponse(res, 400, {
      "message":"username and password are required"
    });
  }
};


module.exports.createOne = function(req, res){
  if (req.body.username || req.body.password || req.body.firstname || req.body.lastname || req.body.phoneNumber){
    Person.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.mail,
      phoneNumber: req.body.phoneNumber,
      smartphone: req.body.smartphone,
      profession: req.body.profession,
      address: req.body.address,
      role: req.body.role
    }, function(err, person){
      if(err){
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 200, person);
      }
    });
  }
};
