var express = require('express');
var router = express.Router();


router.post('/login', function(req, res){
  console.log(req.body);
  if (req.body.username || req.body.password){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);
    res.status(200);
    res.json("success");
  } else {
    res.status(400);
    res.json("fail");
  }
});


module.exports = router;
