var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Tracker = mongoose.model('Tracker');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.addLocation = function(req, res){
  if(!req.body.username || !req.body.lng || !req.body.lat){
    sendJsonResponse(res, 400, {"message":"username, lng and lat are required"});
  } else {
    Person.findOne({
      username: req.body.username
    },function(err, person1){
      if(!person1){
        sendJsonResponse(res, 400, {"message":"person not found"});
      }else if(err){
        sendJsonResponse(res, 404, err);
      }else{
        Tracker.findOne({
          username: person1.username
        },function(err, tracker){
          if(!tracker){
            Tracker.create({
              username: person1.username,
              person: person1,
              locations: [{
                lng: req.body.lng,
                lat: req.body.lat
              }]
            },function(err, result){
              if(!result){
                sendJsonResponse(res, 400, {"message":"err"})
              }else if(err){
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, true);
              }
            });
          } else if(err){
            sendJsonResponse(res, 404, err);
          }else {
            tracker.locations.push({
              lng: req.body.lng,
              lat: req.body.lat
            });
            tracker.save(function(err, result){
              if(err){
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, true);
              }
            });
          }
        })
      }
    });
  }
};
