var mongoose = require('mongoose')
var Item = mongoose.model('Item')
var User = mongoose.model('User')

module.exports = {

	create: function(req,res){
		var item = new Item(req.body);
		item.created_by = req.session.userInfo.name;
		item.save(function(err){
			if(err){
				console.log(err);
				res.json({status: false});
			} else {
				User.findOne({_id: req.session.userInfo.id}, function(err, user){
					if(err){
						res.json({status: false});
					}else {
						user._items.push(item);
						user.save();
						User.findOne({name: item.user_tagged}, function(err, user){
							if(err){
								console.log("Error......")
							} else{
							user._items.push(item);
							user.save();
							res.json({status: true});
						}
						})						
					}
				})
			}
		})
	},

	update: function(req,res){
		Item.findOne({_id: req.params.id}, function(err, item){
			if(err){
				res.json({status: false});
			} else{
				item.checked_status = true;
				item.save(function(err){
					res.json({status: true});
				})
			}
		})
	},

	findOne: function(req,res){
		Item.find({$or: [{created_by: req.params.id}, {user_tagged: req.params.id}]}, function(err, user){
			if(err){
				res.json(err);
			} else{
				res.json(user);
			}
		})
	},

	index: function(req,res){
		Item.find({$or: [{created_by: req.session.userInfo.name}, {user_tagged: req.session.userInfo.name}]}, function(err, items){
			if(err){
				res.json(err);
			} else{
				res.json(items);
			}
		})
	},



}