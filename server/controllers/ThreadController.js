var ThreadModel = require('../models/ThreadModel.js');

const ThreadController = {

    like: function (req,res) {
        ThreadModel.findOne({_id : req.params.id})
        .then((thread) => {
            let index = thread.likes.indexOf(req.params.userId)
            let message = ''
            if(index == -1){
                thread.likes.push(req.params.userId)
                message = 'liked'
            } else {
                thread.likes.splice(index,1)
                message = 'unliked'
            }
            thread.save()
            .then((result) => {
                res.json({
                    result,message
                })
            }).catch((err) => {
                res.json(err)
            });

        }).catch((err) => {
            console.log({err});
        });

    },

    list: function (req, res) {
        ThreadModel.find().populate('author comment', '_id  firstName lastName').sort('-createdAt').exec()
        .then((result) => {
            return res.json(result);
        }).catch((err) => {
            return res.status(500).json({
                message: 'Error when getting Thread.',
                error: err
            });
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        ThreadModel.findOne({_id: id}, function (err, Thread) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Thread.',
                    error: err
                });
            }
            if (!Thread) {
                return res.status(404).json({
                    message: 'No such Thread'
                });
            }
            return res.json(Thread);
        });
    },

    create: function (req, res) {
        var Thread = new ThreadModel({
			title : req.body.title,
			author : req.body.author,
			content : req.body.content,
			comment : [],
			status : req.body.status ? req.body.status : 'open' ,
			category : req.body.category || 'general'

        });

        Thread.save(function (err, Thread) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(201).json(Thread);
        });
    },

    search: function (req, res) {
        ThreadModel.find({
                $or: [{
                    title: new RegExp(req.body.searchinput, 'i')
                },{
                    category: new RegExp(req.body.searchinput, 'i')
                }]
            })
            .populate('author comment').sort('-createdAt').exec()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message
                })
            })
    },

    update: function (req, res) {
        var id = req.params.id;
        ThreadModel.findOne({_id: id}, function (err, Thread) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Thread',
                    error: err
                });
            }
            if (!Thread) {
                return res.status(404).json({
                    message: 'No such Thread'
                });
            }

            Thread.title = req.body.title ? req.body.title : Thread.title;
			Thread.author = req.body.author ? req.body.author : Thread.author;
			Thread.content = req.body.content ? req.body.content : Thread.content;
			Thread.comment = req.body.comment ? req.body.comment : Thread.comment;
			Thread.createdAt = req.body.createdAt ? req.body.createdAt : Thread.createdAt;
			Thread.status = req.body.status ? req.body.status : Thread.status;
			Thread.category = req.body.category ? req.body.category : Thread.category;
			
            Thread.save(function (err, Thread) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Thread.',
                        error: err
                    });
                }

                return res.json(Thread);
            });
        }).populate('author comment', '_id  firstName lastName').exec()
    },

    remove: function (req, res) {
        var id = req.params.id;
        ThreadModel.findByIdAndDelete(id, function (err, Thread) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Thread.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

module.exports = ThreadController