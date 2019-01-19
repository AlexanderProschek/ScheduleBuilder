var p = require('./scheduleMaker');

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

p(classes).then(res => {
    console.log(res);
})