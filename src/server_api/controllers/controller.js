var crypto = require('crypto');
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res){
  if (req.body.username || req.body.password){
    var username = req.body.username;
    var password = req.body.password;
    Person.findOne({username:username}, function (err, person) {
      if (err){
        sendJsonResponse(res, 400, err);
      } else {
        console.log(person);
        if (password === person.password){
          sendJsonResponse(res, 200, person);
        } else {
          sendJsonResponse(res, 400, {"message":"Invalid password"});
        }
      }
    });
    // var hashStr = crypto.createHash('md5').update(username).digest('hex');
    // var roleStr = 'role';
    // var content = {
    //   token: hashStr
    //   role: roleStr
    // };
    // sendJsonResponse(res, 200, content);

  } else {
    sendJsonResponse(res, 400, {
      "message":"username and password are required"
    });
  }
};
