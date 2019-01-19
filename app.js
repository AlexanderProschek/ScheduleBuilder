var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.send(express.static("/frontend"));
});

app.listen(80);