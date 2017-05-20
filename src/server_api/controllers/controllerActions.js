/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Action = mongoose.model('Action');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.getActions = function(req, res) {
  actions = [];
  Action.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
      sendJsonResponse(res, 200, locations);
        actions.push(value.address, value)
      });
      sendJsonResponse(res, 200, actions);
    }
  })
};

module.exports.createAction = function(req, res){
  if(!req.body.title || !req.body.details || !req.body.lng2 || !req.body.lat2){
    sendJsonResponse(res, 400, {"message":"title, details, coords are required"});
  } else {
    var lng1 = req.body.action.leader.address.coords[0];
    var lat1 = req.body.action.leader.address.coords[1];
    var lng2 = req.body.action.coords[0];
    var lat2 = req.body.action.coords[1];



    Action.create({
      title : req.body.action.title,
      details : req.body.action.details,
      professions : req.body.action.profession ? req.body.profession.split(",") : req.body.profession,
      leader : {
        username: req.body.action.leader.username,
        password: req.body.action.leader.password,
        firstname: req.body.action.leader.firstname,
        lastname: req.body.action.leader.lastname,
        mail: req.body.action.leader.mail,
        phoneNumber: req.body.action.leader.phoneNumber,
        smartphone: req.body.action.leader.smartphone,
        profession: req.body.action.leader.profession ? req.body.action.leader.profession.split(",") : req.body.action.leader.profession,
        address: {
          addressname : req.body.action.leader.address.addressname,
          coords: [parseFloat(lng1), parseFloat(lat1)]
        },
        role: req.body.action.leader.role,
        available: req.body.action.leader.available
      },
      coords : [parseFloat(lng2), parseFloat(lat2)],
      personNumber: req.body.action.personNumber
    }, function(err, action){
      if(err){
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, action);
      }
    });
  }
};
