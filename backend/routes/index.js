const express = require('express');
const router = express.Router();

const authHandler = require('../middlewares/authHandler.js');

const authController = require('../controllers/auth');
const nodeController = require('../controllers/node');


router.post('/login', authController.login);

router.post('/users', authHandler.validateRequest(), authController.create);

router.post('/users/confirm', authController.confirm);

router.get('/nodes', authHandler.validateRequest(), nodeController.list);

router.put('/nodes', authHandler.validateRequest(), nodeController.update);

// router.post('/nodes', authHandler.validateRequest(), nodeController.create);

router.post('/logout', authHandler.validateRequest(), authController.logout);

module.exports = router;
