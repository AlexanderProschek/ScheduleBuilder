var express = require('express');
var app = express();
var maker = require('./scheduleMaker');

app.use('/', express.static('frontend'));

/*
app.get('/', (req, res) => {
	res.send(express.static("/main.html"));
}); */

// Handle an incoming schedule request
app.post('/run', (req, res) => {
    
});

//app.listen(80);

var classes = [
    {
        'dep': 'CSCI',
        'num': '1730'
    },
    {
        'dep': 'CSCI',
        'num': '2610'
    },
    {
        'dep': 'MATH',
        'num': '3300'
    },
    {
        'dep': 'ENGL',
        'num': '1102'
    },
    {
        'dep': 'BIOL',
        'num': '1103'
    }
]

console.log(maker(classes));