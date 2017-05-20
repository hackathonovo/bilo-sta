var express = require('express');
var router = express.Router();
var controllerPeople = require('../controllers/controllerPeople');

router.post('/login', controllerPeople.login);
router.get('/locations', controllerPeople.login);

module.exports = router;
