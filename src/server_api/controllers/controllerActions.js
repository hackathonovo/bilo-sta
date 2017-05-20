/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Action = mongoose.model('Action');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

var addProfessions = function(req){
  var professions = req.body.leader.professions;
  prof = [];
  for (var i = 0; i < professions.length; ++i){
    prof.push(professions[i]);
  }
  return prof;
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
  if(!req.body.title || !req.body.details || !req.body.coords[0] || !req.body.coords[1]){
    sendJsonResponse(res, 400, {"message":"title, details, coords are required"});
  } else {
    var lng1 = req.body.leader.address.coords[0];
    var lat1 = req.body.leader.address.coords[1];
    var lng2 = req.body.coords[0];
    var lat2 = req.body.coords[1];



    Action.create({
      title : req.body.title,
      details : req.body.details,
      professions : req.body.profession ? req.body.profession.split(",") : req.body.profession,
      leader : {
        username: req.body.leader.username,
        password: req.body.leader.password,
        firstname: req.body.leader.firstname,
        lastname: req.body.leader.lastname,
        mail: req.body.leader.mail,
        phoneNumber: req.body.leader.phoneNumber,
        smartphone: req.body.leader.smartphone,
        profession: req.body.leader.profession,
        address: {
          addressname : req.body.leader.address.addressname,
          coords: [parseFloat(lng1), parseFloat(lat1)]
        },
        role: req.body.leader.role,
        available: req.body.leader.available,
      },
      coords : [parseFloat(lng2), parseFloat(lat2)],
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
