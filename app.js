'use strict'

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
require('./filters')(swig);
var wikiRouter = require('./routes/wiki')

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

app.use('/wiki', wikiRouter);

app.use(express.static(__dirname + '/public'));

app.listen(3000);