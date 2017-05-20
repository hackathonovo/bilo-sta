var crypto = require('crypto');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Station = mongoose.model('Station');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.getUsers = function(req, res){
  Person.find({}, function(err, persons){
    if(err){
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, persons);
    }
  });
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

module.exports.createUser = function(req, res){
  if (req.body.username || req.body.password || req.body.firstname || req.body.lastname || req.body.phoneNumber){
    Person.findOne({username:req.body.username}, function (err, person) {
      if(!person){
        Person.create({
          username: req.body.username,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          mail: req.body.mail,
          phoneNumber: req.body.phoneNumber,
          smartphone: req.body.smartphone,
          profession: req.body.profession ? req.body.profession.split(",") : req.body.profession,
          address: {
            addressname : req.body.addressname,
            coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
          },
          role: req.body.role
        }, function(err, person){
          if(err){
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 201, person);
          }
        });
      } else if (err){
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 400, {"message":"Username already exists!"});
      }
    });
  }
};

module.exports.updateUser = function(req, res){
  if(!req.params.username){
    sendJsonResponse(res, 400, {"message":":username required"});
  } else {
    Person.findOne({username:req.params.username}, function (err, person) {
      if(person){
        person.username = req.body.username ? req.body.username : person.username;
        person.password = req.body.password ? req.body.password : person.password;
        person.firstname = req.body.firstname ? req.body.firstname : person.firstname;
        person.lastname = req.body.lastname ? req.body.lastname : person.lastname;
        person.mail = req.body.mail ? req.body.mail : person.mail;
        person.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : person.phoneNumber;
        person.smartphone = req.body.smartphone ? req.body.smartphone : person.smartphone;
        person.profession = req.body.profession ? req.body.profession.split(",") : person.profession;
        person.address = {
          addressname : req.body.addressname ? req.body.addressname : person.address.name,
          coords : [parseFloat(req.body.lng ? req.body.lng : person.address.lng),
            parseFloat(req.body.lat ? req.body.lat : person.address.lat)]
        };
        person.role = req.body.role ? req.body.role : person.role;
        person.save(function(err, person){
          if(err){
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, person);
          }
        });
      } else if (err){
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 400, {"message":"Username not found"});
      }
    });
  }
};
