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
   Page.find({})
  .then(function(pagesArr) {
  	var obj = {pages: pagesArr};
  	res.render('index', obj);
  }, function(err) {console.log(err)})
});



router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
	var pageName = req.params.urlTitle;
	// res.send('hit dynamic route at ' + req.params.urlTitle);
	Page.findOne({ 'urlTitle': pageName })
	.populate('author')
	.then(function(page) {
		console.log(page);
		res.render('wikipage', page);
	}, function(err) {console.log(err)})
});

router.post('/', function(req, res, next) {
	var page = new Page ({
		title: req.body.title,
		content: req.body.content,
		// author: req.body.name
	});
	page.save()
	.then(function(page) {
		res.redirect(page.route);
	}, function(err) { console.log(err)})
});

module.exports = router;





