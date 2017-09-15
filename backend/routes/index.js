var express = require('express');
var router = express.Router();

const jwtHandler = require('../middlewares/jwt-handler.js');

const authController = require('../controllers/auth');
const nodeController = require('../controllers/node');


router.post('/login', authController.login);

router.get('/nodes', jwtHandler.validateRequest(), nodeController.list);

router.post('/nodes', jwtHandler.validateRequest(), nodeController.create);

router.post('/logout', jwtHandler.validateRequest(), authController.logout);

module.exports = router;
