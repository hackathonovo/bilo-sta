var express = require('express');
var router = express.Router();
var controllerPeople = require('../controllers/controllerPeople');
var controllerLocations = require('../controllers/controllerLocations');
var controllerActions = require('../controllers/controllerActions');


router.post('/login', controllerPeople.login);
router.get('/locations', controllerLocations.locations);
router.get('/actions', controllerActions.actions);
router.post('/people', controllerPeople.createUser);
router.post('/people/:username', controllerPeople.updateUser);
router.get('/people', controllerPeople.getUsers);
router.post('/actions', controllerActions.createAction);

module.exports = router;
