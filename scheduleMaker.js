/**
 * Author: Alexander Proschek
 */

const rp = require('request-promise');
const Bluebird = require('bluebird');

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
    },
    {
        'dep': 'ENGL',
        'num': '1102'
    },
    {
        'dep': 'MATH',
        'num': '3300'
    }
]

// Get all the neccesary data from API calls
function run(allClasses) {
    // Set up the requests for Bluebird
    var requests = [];
    while(allClasses.length > 0) {
        var cur = allClasses.pop();
        var url = baseUrl + cur.dep + '/courses/' + cur.num + '/sections';
        var t = {'uri':url, 'json':true};
        requests.push(rp(t));
    }

    // Add all the API calls
    var resp = [];
    return Bluebird.all(requests)
    .spread(function () {
        // Wait till all the API calls have answered
        // and extract the responses
        for(i = 0; i < arguments.length; i++) {
            resp.push(arguments[i]);
        }
        return combination(resp);
    })
    .catch(function (err) {
        // Handle errors
        console.log(err);
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

    return {'max':numIter,'true':next.length,'schedules':next};
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

/*
(async () => {
    var res = await run(classes)
    console.log(res)
})()