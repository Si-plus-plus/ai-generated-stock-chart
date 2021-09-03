var notGenerated = true;
$("#generate_button").click(function(){
    $("#generate_button").hide();
    $("#generate_button_disabled").show();

    notGenerated = false;
});
$("#generate_button_disabled").hide();
$("#generate_button").show();
