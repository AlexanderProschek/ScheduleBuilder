
var counter = 0;

$('#coursenamemenu a').click(function(){
    var selText = $(this).text();
    document.getElementById("text").innerHTML = selText;
});


$('#coursenummenu a').click(function(){
    var selText = $(this).text();
    /*$('#text2').val(selText);*/
    document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + " " + selText;
});

$('#add').click(function(){
    if(counter <= 7){
        counter = counter + 1;
        var word = $('#text').text()
        $('#class-title').after("<div class=\"p-2 bd-highlight close testses\" id=\"class" + counter + "\">"  + word + "</div>");
    }
});

$('.testses').click(function (){
    $(this).remove();
    counter = counter -1;
})










