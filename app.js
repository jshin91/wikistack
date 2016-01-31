'use strict'

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
require('./filters')(swig);

//swig boilerplate
app.set('views', __dirname + '/views'); 
app.set('view engine', 'html'); 
app.engine('html', swig.renderFile); 
swig.setDefaults({ cache: false });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
	res.redirect('/wiki');
})

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));
app.use(function(err, req, res, next) {
	console.error(err);
	res.status(500).send(err.message);
})

app.use(express.static(__dirname + '/public'));

app.listen(3000);