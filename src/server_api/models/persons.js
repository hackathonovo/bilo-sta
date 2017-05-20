var mongoose = require('mongoose');
var stationSchema = require('./stations');
var roleSchema = require('./roles');


var personSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  mail: String,
  available: {type: Boolean, "default":true},
  phoneNumber: {type: String, required:true},
  smartphone: Boolean,
  profession: {type:[String], enum:['SPELEOLOG','ALPINIST','VODA','HELIKOPTER']},
  address: {type: stationSchema},
  role: {type: [roleSchema],}
});

mongoose.model('Person', personSchema);

module.exports = {
  personSchema: personSchema
};
