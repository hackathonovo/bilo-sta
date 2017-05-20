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

places = [];
module.exports.getPlaces = function (req , res) {
  Person.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        places.push(value.places)
      })
      sendJsonResponse(res, 200, places)
    }
  });
}
