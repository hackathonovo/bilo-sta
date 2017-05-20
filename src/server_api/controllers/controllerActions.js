/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Action = mongoose.model('Action')
var db = require('../models/db');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.actions = function(req, res) {
  Action.find(function (err, items) {
    if(err){
      sendJsonResponse(res, 400, err);
    }
    else{
      items.forEach(function (value) {
        locations.push(value.address, value)
      })
      sendJsonResponse(res, 200, locations)
    }
  })
}
