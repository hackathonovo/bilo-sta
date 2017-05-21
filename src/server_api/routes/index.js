var express = require('express');
var router = express.Router();
var controllerPeople = require('../controllers/controllerPeople');
var controllerLocations = require('../controllers/controllerLocations');
var controllerActions = require('../controllers/controllerActions');
var controllerRoles = require('../controllers/controllersRoles');
var controllerTracker = require('../controllers/controllerTracker');

router.post('/login', controllerPeople.login);
router.get('/locations', controllerLocations.getLocations);
router.get('/actions', controllerActions.getActions);
router.post('/people', controllerPeople.createUser);
router.post('/people/:username', controllerPeople.updateUser);
router.get('/people', controllerPeople.getUsers);
router.get('/roles', controllerRoles.getRoles);
router.post('/roles',controllerRoles.setRoles);
router.post('/actions', controllerActions.createAction);
router.get('/people/available', controllerPeople.availableUsers);
router.post('/availability', controllerPeople.setAvailability);
router.get('/availability/:username', controllerPeople.getAvailability);
router.post('/action/:_id', controllerActions.updateAction);
router.post('/help', controllerActions.addRescuer);
router.post('/location', controllerTracker.addLocation);
router.get('/action/:id/active', controllerActions.getCurrentLocations);


module.exports = router;
