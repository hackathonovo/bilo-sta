/**
 * Created by Matija on 20.5.2017..
 */

var mongoose = require('mongoose');
var personSchema = require('./persons');

var actionSchema = new mongoose.Schema({
  title : {type : String, required : true},
  details : {type : String, required : true},
  persons : [personSchema],
  professions : {type : String, enum:['SPELEOLOG','ALPINIST','VODA','HELIKOPTER']},
  leader : personSchema,
  coords : {type: [Number], index: '2dsphere', required: true},
  date: {type: Date, default: Date.now}
});

mongoose.model('Action', actionSchema);

module.exports = {
  actionSchema : actionSchema
};
