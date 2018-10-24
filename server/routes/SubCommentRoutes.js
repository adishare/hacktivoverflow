var express = require('express');
var router = express.Router();
var SubCommentController = require('../controllers/SubCommentController.js');

/*
 * GET
 */
router.get('/', SubCommentController.list);

/*
 * GET
 */
router.get('/:id', SubCommentController.show);

/*
 * POST
 */
router.post('/', SubCommentController.create);

/*
 * PUT
 */
router.put('/:id', SubCommentController.update);

/*
 * DELETE
 */
router.delete('/:id', SubCommentController.remove);

module.exports = router;
