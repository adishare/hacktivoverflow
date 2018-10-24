var CommentModel = require('../models/CommentModel.js');

module.exports = {

    vote: function (req, res) {
        CommentModel.findOne({
                _id: req.params.id
            })
            .then((comment) => {
                let index = comment.likes.indexOf(req.params.userId)
                let message = ''
                if (index == -1) {
                    comment.likes.push(req.params.userId)
                    message = 'voted'
                } else {
                    comment.likes.splice(index, 1)
                    message = 'unvoted'
                }
                comment.save()
                    .then((result) => {
                        res.json({
                            result,
                            message
                        })
                    }).catch((err) => {
                        res.json(err)
                    });

            }).catch((err) => {
                res.json(err)
            });

    },


    list: function (req, res) {
        CommentModel.find({
                thread: req.params.threadId
            }).populate('user subComment', '_id firstName lastName email')
            .then((result) => {
                return res.json(result);
            }).catch((err) => {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            });
    },

    show: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({
            _id: id
        }, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment.',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }
            return res.json(Comment);
        });
    },

    create: function (req, res) {
        var Comment = new CommentModel({
            thread: req.params.threadId,
            user: req.body.user,
            commentContent: req.body.commentContent,
            likes: [],
            subComment: []

        });

        Comment.save(function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Comment',
                    error: err
                });
            }
            return res.status(201).json(Comment);
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        CommentModel.findOne({
            _id: id
        }, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Comment',
                    error: err
                });
            }
            if (!Comment) {
                return res.status(404).json({
                    message: 'No such Comment'
                });
            }

            Comment.thread = req.body.thread ? req.body.thread : Comment.thread;
            Comment.user = req.body.user ? req.body.user : Comment.user;
            Comment.commentContent = req.body.commentContent ? req.body.commentContent : Comment.commentContent;
            Comment.likes = req.body.likes ? req.body.likes : Comment.likes;
            Comment.subComment = req.body.subComment ? req.body.subComment : Comment.subComment;

            Comment.save(function (err, Comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Comment.',
                        error: err
                    });
                }

                return res.json(Comment);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        CommentModel.findByIdAndRemove(id, function (err, Comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Comment.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};