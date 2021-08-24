function finishGame (){
    $("#finished").show();
    $(".di").addClass("disabled");

    $("#reset_b").removeClass("btn-outline-warning");
    $("#reset_b").addClass("btn-warning");
}
$("#finished").hide();
