var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 
// // parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false })); //for HTML form submits

// // parse application/json
// router.use(bodyParser.json()) //for AJAX requests



router.get('/', function(req, res, next) {
  res.redirect('/');
});



router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.post('/', function(req, res, next) {
	var page = new Page ({
		title: req.body.title,
		content: req.body.content
	});
	page.save()
	.then(function() {
		res.redirect('/');
	}, function(err) { console.log(err)})
});

module.exports = router;