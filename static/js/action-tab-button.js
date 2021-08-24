var _side = "buy";

$("#buy-button").click(function() {
    $(".sb").removeClass('active');
    $(".sb").removeClass('btn-danger');
    $(".sb").addClass('btn-outline-danger');
    $(".sell-details").hide();

    $(".bb").addClass("active");
    $(".bb").removeClass('btn-outline-success');
    $(".bb").addClass('btn-success');
    $(".buy-details").show();

    _side = "buy";
});

$("#sell-button").click(function() {
    $(".bb").removeClass('active');
    $(".bb").removeClass('btn-success');
    $(".bb").addClass('btn-outline-success');
    $(".buy-details").hide();

    $(".sb").addClass("active");
    $(".sb").removeClass('btn-outline-danger');
    $(".sb").addClass('btn-danger');
    $(".sell-details").show();

    _side = "sell";
});

$("#buy-button").click();
