var crypto = require('crypto');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res){
  //console.log(req.body);
  if (req.body.username || req.body.password){
    var username = req.body.username;
    var password = req.body.password;
    //console.log(username, password);
    var hashStr = crypto.createHash('md5').update(username).digest('hex');
    var roleStr = 'role';
    var content = {
      token: hashStr,
      role: roleStr
    };
    sendJsonResponse(res, 200, content);

  } else {
    sendJsonResponse(res, 400, {
      "message":"username and password are required"
    });
  }
};
