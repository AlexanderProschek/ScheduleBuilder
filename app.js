/**
 * Author: Alexander Proschek
 */

 // Imports
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// Import the schedule builder
var p = require('./scheduleMaker');

// Import the Static front end
app.use('/', express.static('frontend'));

// Set up the middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send(express.static("/main.html"));
});

// Handle an incoming schedule request
app.post('/raw', (req, reso) => {
	console.log(req.body);
    p(req.body).then(res => {
		reso.send(res);
	})
});

// Handle an incoming scored schedule request
app.post('/scored', (req, res) => {
	// Todo
});

app.listen(80);