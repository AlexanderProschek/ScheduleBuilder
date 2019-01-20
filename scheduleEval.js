/**
 * Author: Alexander Proschek 
 */

/*
 Options:
 - Morning or afternoon classes?
 - Close classes or lots of space?
 - Close classes better!
*/

var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJd8BlQ2BZwokRAFUEcm_qrcA&key=';

module.exports = function run(classes, options) {
    var back = [];

    while(classes.length > 0) {
        var cur = classes.pop();
        var score = eval(cur, options);
        back.push(cur);
    }

    return back;
}



function eval(input, options) {
    // Convert to week view
    var week = [[],[],[],[],[]];
    
    // Extracting essential information from the schedule
    for(i = 0; i < input.length; i++) {
        var timeslots = input[i].timeslots;
        for(j = 0; j < timeslots.length; j++) {
            week[timeslots[j].day].push({"start":timeslots[j].start_time,
                "end":timeslots[j].end_time,"loc":timeslots[j].location});
        }
    }

    resue(week,"M");
    resue(week,"T");
    resue(week,"W");
    resue(week,"R");
    resue(week,"F");

    week.array.forEach(element => {
        
    });

    //var earliest = option.earliest;

    // Calculate fial score
}

function resue(week, day) {
    week[day].sort((o1,o2) => {
        return o1.start - o2.start;
    });
}

const locTable = {
    "uga": {},
    "gatech": {},
    "emory": {},
    "neu": {},
    "umd": {}
}