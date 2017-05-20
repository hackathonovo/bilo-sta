var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  coords: {type: [Number], index: '2dsphere', required: true}
});

mongoose.model('Location', locationSchema);

module.exports = {
  locationSchema: locationSchema
};
