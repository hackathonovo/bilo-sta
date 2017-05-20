/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Action = mongoose.model('Action');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.actions = function(req, res) {
  actions = [];
  Action.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        actions.push(value.address, value)
      });
      sendJsonResponse(res, 200, actions);
    }
  });
};

module.exports.createAction = function(req, res){
  if(!req.body.title || !req.body.details || !req.body.lng2 || !req.body.lat2){
    sendJsonResponse(res, 400, {"message":"title, details, coords are required"});
  } else {
    Action.create({
      title : req.body.title,
      details : req.body.details,
      professions : req.body.profession ? req.body.profession.split(",") : req.body.profession,
      leader : {
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
          coords: [parseFloat(req.body.address.coords[0]), parseFloat(req.body.address.coords[1])]
        },
        role: req.body.role,
        available: req.body.available
      },
      coords : [parseFloat(req.body.coords[0]), parseFloat(req.body.coords[1])],
      personNumber: req.body.personNumber
    }, function(err, action){
      if(err){
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, action);
      }
    });
  }
};
