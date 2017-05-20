var express = require('express');
var router = express.Router();
var controllerPeople = require('../controllers/controllerPeople');
var controllerLocations = require('../controllers/controllerLocations');
var controllerActions = require('../controllers/controllerActions');
var controllerPlaces = require('../controllers/controllerPlaces')
var controllerRoles = require('../controllers/controllersRoles')
router.post('/login', controllerPeople.login);
router.get('/locations', controllerLocations.getLocations);
router.get('/actions', controllerActions.getActions)
router.post('/people', controllerPeople.createUser);
router.post('/people/:username', controllerPeople.updateUser);
router.get('/people', controllerPeople.getUsers);
//router.get('/places', controllerPlaces.getPlaces);
router.get('/roles', controllerRoles.getRoles);
router.post('/roles',controllerRoles.setRoles);

module.exports = router;
