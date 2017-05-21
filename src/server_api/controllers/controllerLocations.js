/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Station = mongoose.model('Station');
var db = require('../models/db');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};


module.exports.getLocations = function (req , res) {
  locations = [];
  Person.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        locations.push(value)
        })
      sendJsonResponse(res, 200, locations)
    }
  });
};


