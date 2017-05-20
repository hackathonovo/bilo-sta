/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var db = require('../models/db');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

roles = [];
module.exports.getRoles = function (req , res) {
  Person.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        roles.push(value.role)
      });
      sendJsonResponse(res, 200, roles)
    }
  });
};

module.exports.setRoles = function(req, res) {
  if (req.body.username || req.body.role) {
    Person.findOne({username: req.body.username}, function (err, person) {
      if (person) {
        person.role = req.body.role
        person.save(function(err, person){
          if(err){
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, person);
          }
        });

      }
      else {
        sendJsonResponse(res, 400, {"message": "Username doesn't exist!"});
      }
    })
  }
  else
    {
      sendJsonResponse(res, 400, "Please put data")
    }
};
