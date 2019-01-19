var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.send("Hello World");
});

app.get('/other', (req, res) => {
	res.send('Other');
});

app.listen(80);
