var mongoose = require('mongoose');
var stationSchema = require('./stations');

var personSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  mail: String,
  available: {type: Boolean, "default":true},
  phoneNumber: {type: String, required:true},
  smartphone: Boolean,
  profession: {type:[String], enum:['speolog','alpinist','spasavatelj_na_vodi','helikoptersko_spasavanje', 'sve']},
  address: {type: stationSchema},
  role: {type: String, enum:['rookie','admin','rescuer','instructor']}
});

//personSchema.ensureIndex({"address.coords": "2dsphere"});
mongoose.model('Person', personSchema);

module.exports = {
  personSchema: personSchema
};
