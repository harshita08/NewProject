var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {

	create: function(req,res){
		User.findOne({name: req.body.name}, function(err, user){
			if(err){
				console.log("Error encountered..");
			} else{
				if(user){
					req.session['userInfo'] = {
						id: user._id,
						name: user.name
					}
					res.json({status: true, userInfo: req.session['userInfo']});
				} else{
					var user = new User(req.body);
					user.save(function(err, newUser){
						if(err){
							console.log("Error....");
							res.json({status: false, errors: 'User not created'});
						} else{
							req.session['userInfo'] = {
								id: user._id,
								name: user.name
							}
							res.json({status: true, userInfo: req.session['userInfo']});
						}
					})
				}
			}
		})
	},


	index: function(req,res){
		User.find({_id: {$ne : req.session.userInfo.id}}, function(err, users){
			if(err){
				console.log("Error.....users not found");
			} else {
				res.json(users);
			}
		})
	},

	session: function(req,res){
		if(req.session['userInfo'])
			res.json({status: true, userInfo: req.session['userInfo']})
		else
			res.json({status: false, userInfo: null})
	},

	logout: function(req,res){
		req.session.destroy(function(err){
			if(err) 
				res.json({status:false, errors:err})
			else{
				res.json({status: true});
			}
		})
	},

}