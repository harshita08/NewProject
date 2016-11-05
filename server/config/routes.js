var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var items = require('../controllers/items.js');

module.exports = function(app){

	app.post('/users', function(req,res){
		users.create(req,res);
	})

	app.get('/session', function(req,res){
		users.session(req,res);
	})

	app.post('/logout', function(req,res){
		users.logout(req,res);
	})

	app.get('/users', function(req,res){
		users.index(req,res);
	})

	app.get('/users/:id', function(req,res){
		items.findOne(req,res);
	})

	app.post('/items', function(req,res){
		items.create(req,res);
	})

	app.get('/items', function(req,res){
		items.index(req,res);
	})

	app.post('/item/:id', function(req,res){
		items.update(req,res);
	})

}