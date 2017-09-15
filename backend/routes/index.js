var express = require('express');
var router = express.Router();

const authHandler = require('../middlewares/authHandler.js');

const authController = require('../controllers/auth');
const nodeController = require('../controllers/node');


router.post('/login', authController.login);

router.get('/nodes', authHandler.validateRequest(), nodeController.list);

router.post('/nodes', authHandler.validateRequest(), nodeController.create);

router.post('/logout', authHandler.validateRequest(), authController.logout);

module.exports = router;
