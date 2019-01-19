var express = require('express');
var app = express();

app.get('/frontend', (req, res) => {
	res.send(express.static("/frontend/main.html"));
});

app.listen(80);