/**
 * Created by Matija on 20.5.2017..
 */

var mongoose = require('mongoose');
var locationSchema = require('./locations');

var stationSchema = new mongoose.Schema({
  name :{type : String, required : true},
  location : {type : locationSchema, required:true}
});

mongoose.model('Station', stationSchema);



module.exports = {
  stationSchema : stationSchema
};