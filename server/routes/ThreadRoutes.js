var express = require('express');
var router = express.Router();
var ThreadController = require('../controllers/ThreadController.js');

router.get('/', ThreadController.list);
router.get('/:id', ThreadController.show);
router.post('/', ThreadController.create);
router.put('/:id', ThreadController.update);
router.delete('/:id', ThreadController.remove);
router.post('/search', ThreadController.search);
router.post('/likes/:id/:userId', ThreadController.like);

module.exports = router;
