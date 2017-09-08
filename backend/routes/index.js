var express = require('express');
var router = express.Router();

const jwtHandler = require('../middlewares/jwt-handler.js');

const authController = require('../controllers/auth');
const nodeController = require ('../controllers/node');


// TODO: update according to Network Dashboard requirements


router.post('/login', authController.login);

router.post('/start-network', jwtHandler.validateRequest(), nodeController.startNetwork);

router.post('/users', authController.createUser);

router.get('/users/:uid', jwtHandler.validateRequest(), authController.getCurrentUser);

router.patch('/users/:uid', jwtHandler.validateRequest(), authController.editUser);

router.post('/logout', jwtHandler.validateRequest(), authController.logout);

module.exports = router;
