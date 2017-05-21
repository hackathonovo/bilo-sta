/**
 * Created by Matija on 20.5.2017..
 */

var mongoose = require('mongoose');
var personSchema = require('./persons');

var actionSchema = new mongoose.Schema({
  title : {type : String, required : true},
  details : {type : String, required : true},
  persons : {type: [personSchema]},
  professions : {type : String, enum:['speolog','alpinist','spasavatelj_na_vodi','helikoptersko_spasavanje', 'sve']},
  leader : {type: personSchema},
  coords : {type: [Number], index: '2dsphere', required: true},
  datumStart: {type: Date, "default": Date.now},
  datumFinish: {type: Date},
  personNumber: {type: Number}
});

mongoose.model('Action', actionSchema);

module.exports = {
  actionSchema : actionSchema
};
