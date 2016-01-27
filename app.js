'use strict'

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
var wikiRouter = require('./routes/wiki')


//swig boilerplate
app.set('views', __dirname + '/views'); 
app.set('view engine', 'html'); 
app.engine('html', swig.renderFile); 
swig.setDefaults({ cache: false });

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //for HTML form submits

// parse application/json
app.use(bodyParser.json()) //for AJAX requests

app.get('/', function(req, res, next) {
	res.render('index');
})

app.use('/wiki', wikiRouter);

app.use(express.static(__dirname + '/public'));

app.listen(3000);