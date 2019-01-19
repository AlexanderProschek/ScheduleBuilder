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
	res.status(200).send(express.static("/main.html"));
});

app.get('/', (req, res) => {
	res.status(200).send("Hello");
});

// Handle an incoming schedule request
app.post('/raw', (req, reso) => {
	console.log(req.body);
    p(req.body).then(res => {
		reso.status(200).send(res);
	})
});

// Handle an incoming scored schedule request
app.post('/scored', (req, res) => {
	// Todo
});

app.listen(80);