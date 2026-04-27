var express = require('express');
var router = express.Router();

var itemController = require('../controllers/itemController');
var healthController = require('../controllers/healthController');

router.get('/health', healthController.health);

router.get('/items', itemController.listItems);
router.post('/items', itemController.createItem);

module.exports = router;
