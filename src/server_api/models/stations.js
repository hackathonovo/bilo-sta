/**
 * Created by Matija on 20.5.2017..
 */

var mongoose = require('mongoose');

var stationSchema = new mongoose.Schema({
  addressname :{type : String, required : true},
  coords: {type: [Number], index: '2dsphere', required: true}
});

mongoose.model('Station', stationSchema);

module.exports = {
  stationSchema : stationSchema
};
