
$(document).ready(function(){

    $("#uga").click(function(){
        /*
            fetch("https://soc.courseoff.com/uga/terms/201901/majors/")
                .then((resp) => resp.json()) // Transform the data into json
                .then(function(data) {
                    console.log(data)
                }).catch(function(err){
                    alert(err);
            });

            */

        window.location.href = 'schedulepageuga.html';

    });





    $("#gatech").click(function(){

        fetch("https://soc.courseoff.com/gatech/terms/201901/majors/")
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                console.log(data)
            }).catch(function(err){
            alert(err);
        });

        window.location.href = 'schedulepageuga.html';

    });

    $("#emory").click(function(){
        window.location.href = 'schedulepageuga.html';
        var json_obj = JSON.parse(Get("https://soc.courseoff.com/emory/terms/201901/majors/"));
        console.log("this is the author name: "+json_obj);
    });


    $("#neu").click(function(){
        window.location.href = 'schedulepageuga.html';
        var json_obj = JSON.parse(Get("https://soc.courseoff.com/neu/terms/201901/majors/"));
        console.log("this is the author name: "+json_obj);
    });

    $("#umd").click(function(){
        window.location.href = 'schedulepageuga.html';
        var json_obj = JSON.parse(Get("https://soc.courseoff.com/umd/terms/201901/majors/"));
        console.log("this is the author name: "+json_obj);
    });


});

