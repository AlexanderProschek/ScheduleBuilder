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
    var n = 10;
    if(options.n) n = options.n;
    var lowest;

    console.log(classes);

    while(classes.length > 0) {
        var cur = classes.pop();
        var score = eval(cur, options);
        if(back.length < n) {
            back.push({"score":score,"sched":cur});
        } else {
            back.sort((e1,e2) => {
                return e2.score - e1.score;
            });
            if(back[n-1].score < score) {
                back[n-1] = {"score":score,"schule":cur};
            }
        }
    }

    back.sort((e1,e2) => {
        return e2.score - e1.score;
    });

    console.log(back);

/*
    back = back.map(e => {
        return e.sched;
    });*/

    return back;
}

// Gives the week schedule a score
function eval(input, options) {
    // Convert to week view
    var week = [[],[],[],[],[]];
    
    // Extracting essential information from the schedule
    for(i = 0; i < input.length; i++) {
        var timeslots = input[i].timeslots;
        for(j = 0; j < timeslots.length; j++) {
            var index = convert(timeslots[j].day);
            week[index].push({"start":timeslots[j].start_time,
                "end":timeslots[j].end_time,"loc":timeslots[j].location});
        }
    }

    week.forEach(e => {
        e.sort((o1,o2) => {
            return o1.start - o2.start;
        });
    });

    // Calculate the mean
    var ave = 0;
    var n = 0;
    week.forEach(e => {
        e.forEach(ee => {
            n += 2;
            ave += ee.start;
            ave += ee.end;
        });
    });

    ave /= n;
    var sd = 0;

    // Calculate the st deviation
    week.forEach(e => {
        e.forEach(ee => {
            sd += Math.pow(ee.start-ave,2);
            sd += Math.pow(ee.end-ave,2);
        });
    });

    sd /= n;    
    sd = Math.sqrt(sd);

    var score = 2;
/*
    // Person wants early or late classes
    if(options.shift == "early") {

    } else {

    }*/
    week.forEach(e => {
        if(e.length > 0) {
            // No early classes
            if(options.earliest) {
                if(e[0].start <= options.earliest) {
                    score -= .2;
                }
            }
            // No late classes
            if(options.latest) {
                if(e[e.length-1].end >= options.latest) {
                    score -= .1;
                }
            }
        }

        if(options.spread && options.spread == "low") {
            for(i = 0; i < e.length - 1; i++) {
                //if(e[i+1].start - e[i].end <= 15);
                if(e[i+1].start - e[i].end <= 45) score += .1;
                if(e[i+1].start - e[i].end > 45) score -+ .1;
            }
        } else if(options.spread) {
            for(i = 0; i < e.length - 1; i++) {
                if(e[i+1].start - e[i].end <= 15) score -= .1;
                //if(e[i+1].start - e[i].end <= 45);
                if(e[i+1].start - e[i].end > 45) score += .1;
            }
        }
    });

    // Calculate fial score
    return score;
}

function convert(inP) {
    switch(inP) {
      case "M":
        return 0;
      case "T":
        return 1;
      case "W":
        return 2;
      case "R":
        return 3;
      case "F":
        return 4;
    }
}

const locTable = {
    "uga": {},
    "gatech": {},
    "emory": {},
    "neu": {},
    "umd": {}
}