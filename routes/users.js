var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {
	User.find({})
	.then(function(users) {
		res.render('userlist', {users: users});
	})
	.then(null, next);
})

router.get('/:userId', function(req, res, next) {
	
	var findUser = User.findById(req.params.userId);
	var findPages = Page.find({author: req.params.userId});

	Promise.all([findUser, findPages])
	.then(function(info){
		var foundUser = info[0];
		var foundPages = info[1];
		res.render('userPages', {
			pages: foundPages, 
			user: foundUser
		});
	})
	.then(null, next);
})


module.exports = router;





















