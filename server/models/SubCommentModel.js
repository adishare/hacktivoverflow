var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SubCommentSchema = new Schema({
	'parentComment' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Comment'
	},
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'subCommentContent' : String,
	'likes' : [{
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}]
},{
	versionKey : false,
	timestamps : true
});

module.exports = mongoose.model('SubComment', SubCommentSchema);
