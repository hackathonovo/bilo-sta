var express = require('express');
var router = express.Router();
var controllerPeople = require('../controllers/controllerPeople');

router.post('/login', controllerPeople.login);
router.get('/locations', controllerPeople.login);
router.post('/people', controllerPeople.createUser);
router.post('/people/:username', controllerPeople.updateUser);
router.get('/people', controllerPeople.getUsers);

module.exports = router;
