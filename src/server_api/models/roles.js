/**
 * Created by Matija on 20.5.2017..
 */
var mongoose = require('mongoose');

var rolesSchema = new mongoose.Schema({
  rolesList : {type : [String]}
});

mongoose.model('Roles', rolesSchema);

module.exports = {
  rolesSchema : rolesSchema
};
