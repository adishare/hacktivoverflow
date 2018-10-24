var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
	'firstName' : {
        type: String,
        required: true
    },
	'lastName' : {
        type: String,
        required: true
    },
	'email' : {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'invalid email',
            isAsync: false
        }
    },
	'password' : {
        type: String,
        required: true
    },
	'gender' : {
        type: String,
        required: true
    },
	'age' : {
        type: Number,
        required: true
    },
	'avatar' : String
},{
    versionKey: false,
    timestamps : true
});

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema);
