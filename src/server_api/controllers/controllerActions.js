/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Action = mongoose.model('Action');
var Person = mongoose.model('Person');

var metersToKm = function(meters){
  return meters / 1000;
};

var kmToMeters = function(km){
  return km * 1000;
};

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.getActions = function(req, res) {
  actions = [];
  trajanjeAkcije = Boolean;
  Action.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        if(value.dateFinish === undefined) {
          trajanjeAkcije = true
          actions.push(value)
        }
        else{
          trajanjeAkcije = false
          actions.push(value)
        }
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
    var lng_action = req.body.coords[0];
    var lat_action = req.body.coords[1];

    var numPeople = parseInt(req.body.personNumber);
    var point = {
      type: "Point",
      coordinates: [parseFloat(lng_action), parseFloat(lat_action)]
    };
    var geoOptions = {
      spherical: true,
      num: numPeople * 2,
    };

    Action.create({
      title : req.body.title,
      details : req.body.details,
      professions : req.body.profession ? req.body.profession.split(",") : req.body.profession,
      persons: req.body.persons,
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
      coords : [parseFloat(lng_action), parseFloat(lat_action)],
      personNumber: req.body.personNumber
    }, function(err, action){
      if(!action){
        sendJsonResponse(res, 400, {"message":"action not created"});
      } else if(err){
        sendJsonResponse(res, 404, err);
      } else {
        Person.geoNear(point, geoOptions, function(err, results, stats){
          var people = [];
          var distances = [];
          if(err){
            sendJsonResponse(res, 404, err);
          } else {
            results.forEach(function(doc){
              people.push(new Person({
                username: doc.obj.username,
                password: doc.obj.password,
                firstname: doc.obj.firstname,
                lastname: doc.obj.lastname,
                mail: doc.obj.mail,
                phoneNumber: doc.obj.phoneNumber,
                smartphone: doc.obj.smartphone,
                profession: doc.obj.profession,
                address: {
                  addressname : doc.obj.address.addressname,
                  coords: [parseFloat(doc.obj.address.coords[0]), parseFloat(doc.obj.address.coords[1])]
                },
                role: doc.obj.role,
                available: doc.obj.available
              }));
              distances.push({distance: doc.dis});
            });
            sendJsonResponse(res, 200, people);
          }
        });
      }
    });
  }
};

module.exports.updateAction = function(req, res){
  if(!req.params._id){
    sendJsonResponse(res, 400, {"message":":_id required"});
  } else {
    Action.findOne({_id:req.params._id}, function (err, action) {
      if(action){
        action.title = req.body.title ? req.body.title : action.title;
        action.details = req.body.details ? req.body.details : action.details;
        action.persons = req.body.persons ? req.body.persons : action.persons ;
        action.professions = req.body.professions ? req.body.professions : action.professions;
        action.leader = req.body.leader ? req.body.leader : action.leader;
        action.coords = req.body.coords ? req.body.coords : action.coords;
        action.personNumber = req.body.personNumber ? req.body.personNumber : action.personNumber;
        action.save(function(err, action){
          if(!action){
            sendJsonResponse(res, 400, {"message":"action undefined"});
          } else if(err){
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, action);
          }
        });
      } else if (err){
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 400, {"message":"action not found"});
      }
    });
  }
};

module.exports.finishAction = function (req, res) {
  Action.findOne({_id:req.params.id}, function (err, action) {
    if(action){
      action.datumFinish = Date.now()
      action.save(function (err, action) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, action);
        }

      })
    }
  })
};

module.exports.addRescuer = function(req, res){
  if(!req.body.username || !req.body.title){
    sendJsonResponse(res, 400, {"message":"username and title required"});
  } else {
    Person.findOne({username: req.body.username}, function(err, person){
      if(!person){
        sendJsonResponse(res, 400, {"message":"person not found"})
      }else if(err){
        sendJsonResponse(res, 404, err);
      }else{
        var personToPush = person;
        //console.log(personToPush);
        Action.findOne({
          title: req.body.title
        },function(err, action){
          if(!action){
            sendJsonResponse(res, 400, {"message":"action not found"});
          } else if(err){
            sendJsonResponse(res, 404, err);
          } else {
            action.persons.push(personToPush);
            action.save(function(err, action){
              console.log(action);
              if(err){
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, true);
              }
            });
          }
        });
      }
    });
  }
};

module.exports.getCurrentLocations = function(req, res){
  if(!req.params.id){
    sendJsonResponse(res, 400, {"message":":id is required"});
  } else {
    Action.findOne({
      _id: req.params.id
    },function(err, action){
      if(!action){
        sendJsonResponse(res, 400, {"message":"action not found"});
      } else if(err){
        sendJsonResponse(res, 404, err);
      } else {
        var persons = action.persons;
        for(var i = 0; i <= persons.length; ++i){

        }
      }
    });
  }
};










