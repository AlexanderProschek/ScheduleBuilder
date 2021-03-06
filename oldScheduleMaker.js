const request = require('request');

// The URL to the online database where class info is scraped from
const baseUrl = 'https://soc.courseoff.com/uga/terms/201901/majors/';

// Example classes from UGA
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

// Get all the neccesary data from API calls
function scrape(allClasses, classArr) {
    var cur = allClasses.pop();
    var url = baseUrl + cur.dep + '/courses/' + cur.num + '/sections';

    // Make the http request to Courseoff
    request(url, { json: true }, (err, res, body) => {
    if (err) { console.log(err); }
        classArr.push(body);
        if(allClasses.length > 0) {
            // Next API call
            scrape(allClasses, classArr);
        } else {
            // API calls done
            return combination(classArr);
        }
    });
}

// Generates all possible schedules
function combination(list) {
    var next = [];
    var indexs = [];
    var numIter = 1;

    // Find the number of possible schedules
    for(i = 0; i < list.length; i++) {
        indexs.push(0);
        numIter *= list[i].length;
    }

    const len = indexs.length;

    // Cycle through all possible schedules
    for(k = 0; k < numIter; k++) {
        var schedule = [];
        for(j = 0; j < list.length; j ++) {
            schedule.push(list[j][indexs[j]]);
        }
        indexs[0]++;
        for(j = 0; j < len; j ++) {
            if(indexs[j] == list[j].length) {
                indexs[j] = 0;
                indexs[j+1]++;
            }
        }

        // Check if schedule is valid
        if(validateSchedule(schedule)) {
            next.push(schedule);
        }
    }

    validateSchedule(next[0]);

    // Schedule Builder is done
    //console.log(next);
    console.log(next.length + '/' + numIter);

    return next;
}

// Checks if a given schedule is valid
// aka no classes are overlapping
function validateSchedule(schedule) {
    var week = {'M':[], 'T':[], 'W':[], 'R':[], 'F':[]};

    for(i = 0; i < schedule.length; i++) {
        var times = schedule[i].timeslots;
        for(t = 0; t < times.length; t++) {
            // Check if there is another class already at the same time
            if(week[times[t].day][times[t].start_time/5] != null ||
                 week[times[t].day][times[t].end_time/5] != null) {
                return false;
            }
            week[times[t].day][times[t].start_time/5] = '(';
            week[times[t].day][times[t].end_time/5] = ')';
        }
    }

    // Check if there are any overlapping classes
    for(w = 0; w < 5; w++) {
        var cur = '(';
        for(i = 0; i < week[w]; i++) {
            if(day[i] != null) {
                console.log(day[w][i]);
                if(day[i] == cur) {
                    if(cur == '(') cur = ')';
                    else cur = '(';
                } else {
                    return false;
                }
            }
        }
    }

    // Schedule is possible
    return true;
}

function run(classes) {
    var classArr = [];
    scrape(classes, classArr);
}

module.exports = run;

run(classes);