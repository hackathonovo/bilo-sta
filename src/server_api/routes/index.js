var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllerPeople');

router.post('/login', controllerPeople.login);


module.exports = router;
