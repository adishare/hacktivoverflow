var SubCommentModel = require('../models/SubCommentModel.js');

/**
 * SubCommentController.js
 *
 * @description :: Server-side logic for managing SubComments.
 */
module.exports = {

    /**
     * SubCommentController.list()
     */
    list: function (req, res) {
        SubCommentModel.find(function (err, SubComments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting SubComment.',
                    error: err
                });
            }
            return res.json(SubComments);
        });
    },

    /**
     * SubCommentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        SubCommentModel.findOne({_id: id}, function (err, SubComment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting SubComment.',
                    error: err
                });
            }
            if (!SubComment) {
                return res.status(404).json({
                    message: 'No such SubComment'
                });
            }
            return res.json(SubComment);
        });
    },

    /**
     * SubCommentController.create()
     */
    create: function (req, res) {
        var SubComment = new SubCommentModel({
			parentComment : req.body.parentComment,
			user : req.body.user,
			subCommentContent : req.body.subCommentContent,
			likes : req.body.likes

        });

        SubComment.save(function (err, SubComment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating SubComment',
                    error: err
                });
            }
            return res.status(201).json(SubComment);
        });
    },

    /**
     * SubCommentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        SubCommentModel.findOne({_id: id}, function (err, SubComment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting SubComment',
                    error: err
                });
            }
            if (!SubComment) {
                return res.status(404).json({
                    message: 'No such SubComment'
                });
            }

            SubComment.parentComment = req.body.parentComment ? req.body.parentComment : SubComment.parentComment;
			SubComment.user = req.body.user ? req.body.user : SubComment.user;
			SubComment.subCommentContent = req.body.subCommentContent ? req.body.subCommentContent : SubComment.subCommentContent;
			SubComment.likes = req.body.likes ? req.body.likes : SubComment.likes;
			
            SubComment.save(function (err, SubComment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating SubComment.',
                        error: err
                    });
                }

                return res.json(SubComment);
            });
        });
    },

    /**
     * SubCommentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        SubCommentModel.findByIdAndRemove(id, function (err, SubComment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the SubComment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
