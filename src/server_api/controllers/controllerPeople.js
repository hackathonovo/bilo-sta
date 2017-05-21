var crypto = require('crypto');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Station = mongoose.model('Station');
var NodeGeocoder = require('node-geocoder');

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
    Person.findOne({username: req.body.username}, function (err, person) {
      if (!person){
        sendJsonResponse(res, 400, {"message":"username not found"})
      } else if (err){
        sendJsonResponse(res, 400, err);
      } else {
        console.log(person);
        if (req.body.password === person.password){
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
  console.log(req.body);

  if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname){
    sendJsonResponse(res, 400, {"message":"required some fields.."});
  } else {
    var options = {
      provider: 'google'
    };
    var geocoder = NodeGeocoder(options);
    geocoder.geocode(req.body.address.addressname, function(err, result){
      var lng = result[0].longitude;
      var lat = result[0].latitude;
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
            profession: req.body.profession,
            address: {
              addressname : req.body.address.addressname,
              coords: [parseFloat(lng), parseFloat(lat)]
            },
            role: req.body.role,
            available: req.body.available
          }, function(err, person){
            if(!person) {
              sendJsonResponse(res, 400, {"message":"person undefined"})
            } else if(err){
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
        person.profession = req.body.profession ? req.body.profession : person.profession;
        person.address = {
          addressname : req.body.address.addressname ? req.body.address.addressname : person.address.addressname
        };
        person.role = req.body.role ? req.body.role : person.role;
        person.available = req.body.available ? req.body.available : person.available;
        person.save(function(err, person){
          if(!person){
            sendJsonResponse(res, 400, {"message":"person undefined"})
          }else if(err){
            sendJsonResponse(res, 404, err);
          } else {
            var options = {
              provider: 'google'
            };
            var geocoder = NodeGeocoder(options);
            geocoder.geocode(person.address.addressname, function(err, result){
              var lng = result[0].longitude;
              var lat = result[0].latitude;
              person.address.coords = [lng, lat];
              person.save(function(err, person){
                if(err){
                  sendJsonResponse(res, 404, err);
                } else {
                  sendJsonResponse(res, 200, person);
                }
              });
            });
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

module.exports.setAvailability = function(req, res) {
  if (!req.body.username || !req.body.availability) {
    sendJsonResponse(res, 400, {"message": "username and days are required"})
  } else {
    Person.findOne({
      username: req.body.username
    }, function (err, person) {
      if (!person) {
        sendJsonResponse(res, 400, {"message": "username not found"})
      } else if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        person.available = req.body.availability;
        person.save(function (err, person) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, person.available);
          }
        });
      }
    });
  }
};

module.exports.availableUsers = function(req, res) {
  availableUsers = [];
  Person.find(function (err, person) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      person.forEach(function (value) {
        console.log(value.available);
        if(value.available === true){
          console.log(value.available);
          availableUsers.push(value);
        }
      });
      sendJsonResponse(res, 200, availableUsers)

    }
  });
};

module.exports.getAvailability = function (req, res) {
  if (!req.params || !req.params.username){
    sendJsonResponse(res, 400, {"message":"username required"})
  } else {
    Person.findOne({username: req.params.username}, function(err, person){
      if(!person){
        sendJsonResponse(res, 400, {"message":"username not found"});
      } else if(err){
        sendJsonResponse(res, 404, err);
      } else{
        sendJsonResponse(res, 200, person.available);
      }
    });
  }
};
