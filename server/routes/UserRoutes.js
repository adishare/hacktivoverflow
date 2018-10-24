var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

router.get('/:id',UserController.findOneById)
router.get('/verify/:token',UserController.verify)

module.exports = router;
