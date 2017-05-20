/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Roles = mongoose.model('Roles');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.setRoles = function (req, res) {
  Roles.find({}, function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else if(!items || items.length == 0){
      Roles.create({
        rolesList: req.body.rolesList
      })
    }
    else{
      items.forEach(function (value) {

          value.rolesList.push(req.body.rolesList);
          value.save(function (err, value) {
            if(err){
              sendJsonResponse(res, 404, err);
            } else {
              sendJsonResponse(res, 200, value);
            }
          })

      });
    }
  })
};

module.exports.getRoles = function (req , res) {
  roles = [];
  Roles.find({},function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        roles.push(value.rolesList)
      })
      sendJsonResponse(res, 200, roles)
    }
  });
};
/*
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

}
*/
