var express = require('express');
var app = express();

app.use('/', express.static('frontend'));

/*
app.get('/', (req, res) => {
	res.send(express.static("/main.html"));
}); */

// Handle an incoming schedule request
app.post('/run', (req, res) => {
    
});

app.listen(80);