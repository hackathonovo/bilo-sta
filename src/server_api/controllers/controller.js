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
    console.log(username, password);
    Person.find({username:username}, function (err, person) {
      console.log(person);
      if (!person) {
        sendJsonResponse(res, 400, {"message":"person not found"});
      } if (err){
        sendJsonResponse(res, 400, err);
      } else {
        console.log(person);
        sendJsonResponse(res, 200, person);
      }
    });
    // var hashStr = crypto.createHash('md5').update(username).digest('hex');
    // var roleStr = 'role';
    // var content = {
    //   token: hashStr,
    //   role: roleStr
    // };
    // sendJsonResponse(res, 200, content);

  } else {
    sendJsonResponse(res, 400, {
      "message":"username and password are required"
    });
  }
};
