var express = require('express');
var router = express.Router();
var controllerPeople = require('../controllers/controllerPeople');
var controllerLocations = require('../controllers/controllerLocations');
var controllerActions = require('../controllers/controllerActions');

//router.post('/login', controllerPeople.login);
router.get('/locations', controllerLocations.locations);
//router.post('/people', controllerPeople.createOne);
router.get('/actions', controllerActions.actions)

module.exports = router;
