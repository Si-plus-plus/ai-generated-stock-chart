var last_page = "home";

function reset (){
    $(".nav-icon").hide()
    $(".page").hide()
}
reset();

function hide_last (id){
    $("#"+last_page+"-p").hide();
    $("#"+last_page+"-i").hide();
    $("#"+last_page).css('color', 'rgba(255, 255, 255, 0.5)');
    last_page = id;
}

$(".nav-link").click(function(){
    var id = $(this).attr('id');
    hide_last(id);

    $("#"+id+"-p").show();
    $("#"+id+"-i").show();
    $("#"+id).css('color', 'white');
});
$("#"+last_page).click();
