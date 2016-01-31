var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

router.get('/', function(req, res, next) {
   Page.find({})
  .then(function(pagesArr) {
  	res.render('index', { pages: pagesArr });
  }, next)
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/search', function(req, res, next) {
	var thingSearched = req.query.search;
	Page.findByTag(thingSearched)
	.then(function(pages){
		res.render('index', { pages: pages});
	})
	.then(null, next);

})

router.get('/:urlTitle', function(req, res, next) {

	Page.findOne({ 'urlTitle': req.params.urlTitle })
	.populate('author')
	.then(function(page) {
		res.render('wikipage', { 
			page : page,
			tags :  page.tags});
	}, next)
});

router.get('/:urlTitle/edit', function(req, res, next) {
	Page.findOne({ 'urlTitle': req.params.urlTitle })
	.then(function(page) {
		res.render('editpage', { 
			page : page,
		});
	}, next)
});

router.get('/:urlTitle/delete', function(req, res, next) {
	Page.findOne({ 'urlTitle': req.params.urlTitle })
	.then(function(page) {
		page.remove()
	})
	.then(function(page) {
		res.redirect('/');
	})
	.then(null, next)
});

router.post('/:urlTitle/', function(req, res, next) {
	Page.findOne( { urlTitle: req.params.urlTitle})
	.then(function(page) {
		page.content = req.body.content
		return page.save();
	})
	.then(function(page) {
		res.redirect(page.route);
	})
	.then(null, next);
})


router.get('/:urlTitle/similar', function(req, res, next) {

	Page.findOne({ urlTitle: req.params.urlTitle })
	.then(function(page) {
		return page.findSimilar()
	})
	.then(function(pages) {
		res.render('index', {pages: pages})
	})
	.then(null, next)
})

router.post('/', function(req, res, next) {

	User.findOrCreate({
		name: req.body.name, 
		email: req.body.email})
	.then(function(user) {
		var page = new Page ({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			tags: req.body.tags.split(/[ ,]+/).filter(Boolean),
			author: user.id
		});
		return page.save();
	})
	.then(function(page) {
		res.redirect(page.route);
	}, next)

});


module.exports = router;





