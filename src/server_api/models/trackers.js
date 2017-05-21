var mongoose = require('mongoose');
var personSchema = require('./persons');

var pointSchema = new mongoose.Schema({
  lng: {type: Number},
  lat: {type: Number}
});

var trackerSchema = new mongoose.Schema({
  username: {type: String, required: true},
  person: {type : personSchema, required : true},
  locations: {type: [pointSchema], required: true}
});

mongoose.model('Tracker', trackerSchema);

module.exports = {
  trackerSchema : trackerSchema
};
