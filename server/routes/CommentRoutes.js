var express = require('express');
var router = express.Router();
var CommentController = require('../controllers/CommentController.js');

router.post('/:threadId', CommentController.create);
router.get('/:threadId', CommentController.list);
// router.get('/:id', CommentController.show);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.remove);
router.post('/votes/:id/:userId', CommentController.vote);

module.exports = router;
