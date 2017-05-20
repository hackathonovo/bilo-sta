/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};



