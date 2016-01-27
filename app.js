'use strict'

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var wikiRouter = require('./routes/wiki')


app.get('/', function(req, res, next) {
	res.render('index');
})

app.use('/wiki', wikiRouter);

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));


//swig boilerplate
app.set('views', __dirname + '/views'); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

app.listen(3000);