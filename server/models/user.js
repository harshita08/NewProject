var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true, 
		minlength: 2, 
		maxlength: 256
	},
	_items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item'
		}
	],
})

mongoose.model('User', UserSchema);