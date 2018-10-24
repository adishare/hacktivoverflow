var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var ThreadSchema = new Schema({
	'title': {
		type: String,
		required: true,
		unique: true,
	},
	'author': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	'content': {
		type: String,
		required: true
	},
	'comment': Array,
	'status': {
		type: String,
		required: true,
		default: 'open'
	},
	'likes': [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	'category': Array
}, {
	versionKey: false,
	timestamps: true
});

ThreadSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Thread', ThreadSchema);