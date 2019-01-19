var maker = require('./scheduleMaker');

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
        'dep': 'BIOL',
        'num': '1103'
    }
]

console.log(maker(classes));