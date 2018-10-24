var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({
	'thread' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Thread'
	},
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'commentContent' : String,
	'likes' : [{
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}],
	'subComment' : [{
	 	type: Schema.Types.ObjectId,
	 	ref: 'SubComment'
	}]
},{
	versionKey : false,
	timestamps : true
});

module.exports = mongoose.model('Comment', CommentSchema);
