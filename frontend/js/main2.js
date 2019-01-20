$(document).ready(function(){
    $("#uga").click(function(){
            fetch("https://soc.courseoff.com/uga/terms/201901/majors/")
                .then((resp) => resp.json()) // Transform the data into json
                .then(function(data) {
                    console.log(data)
                }).catch(function(err){
                    alert(err);
            });
            window.location.href = 'schedulepageuga.html';
    });
});