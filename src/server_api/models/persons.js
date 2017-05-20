var mongoose = require('mongoose');
var stationSchema = require('./stations');

var personSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  mail: String,
  phoneNumber: {type: String, required:true},
  smartphone: Boolean,
  profession: {type:[String], enum:['SPELEOLOG','ALPINIST','VODA','HELIKOPTER']},
  address: stationSchema,
  role: {type: String, enum:['ROOKIE','ADMIN','RESCUER','INSTRUCTOR']}
});

mongoose.model('Person', personSchema);

module.exports = {
  personSchema: personSchema
};
