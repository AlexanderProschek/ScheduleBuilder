var express = require('express');
var app = express();

app.use('/', express.static('frontend'));

/*
app.get('/', (req, res) => {
	res.send(express.static("/main.html"));
}); */

app.listen(80);