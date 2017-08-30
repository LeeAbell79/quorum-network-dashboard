var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth');
const jwtHandler = require('../middlewares/jwt-handler.js');


// TODO: update according to Network Dashboard requirements




router.post('/login', authController.login);

router.post('/users', authController.createUser);

router.get('/users/:uid', jwtHandler.validateRequest(), authController.getCurrentUser);

router.patch('/users/:uid', jwtHandler.validateRequest(), authController.editUser);

router.post('/logout', jwtHandler.validateRequest(), authController.logout);

module.exports = router;
