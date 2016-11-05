var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 5,
		required: true
	},
	description: {
		type: String,
		minlength: 10,
		required: true
	},
	created_by: {
		type: String
	},
	user_tagged: {
		type: String
	},
	checked_status: {
		type: Boolean,
		default: false
	}

}, {timestamps: true})

mongoose.model('Item', ItemSchema);