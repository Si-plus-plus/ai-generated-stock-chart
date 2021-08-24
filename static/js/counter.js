var stat = getCurrentStatus ();

var q_min = 1;
var q_max = 10;
var q_now = 1;
var q_itvl = 1;

var p_min = 0;
var p_max = 0;
var p_now = stat.open;
var p_itvl = 1;

function getPrice (){
    return p_now;
}

function getLots (){
    return q_now;
}

function setItvl (){
    /*
    fraksi saham
    50 - 200    1
    200 - 500   2
    500 - 2000  5
    2000 - 5000 10
    >= 5000     25
    http://www.juruscuan.com/belajar/saham/1391-memahami-aturan-fraksi-harga-saham
    */

    if (50 <= p_now && p_now <= 200) {
        p_itvl = 1;
    }
    else if (p_now <= 500) {
        p_itvl = 2;
    }
    else if (p_now <= 2000) {
        p_itvl = 5;
    }
    else if (p_now <= 5000) {
        p_itvl = 10;
    }
    else{
        p_itvl = 25;
    }
}

function recalc(){
    setItvl();
    p_now = stat.open;
    p_min = stat.last_close-(Math.floor((stat.last_close-Math.ceil(stat.last_close*0.93))/p_itvl)*p_itvl);
    p_max = stat.last_close+(Math.floor((Math.floor(stat.last_close*1.25)-stat.last_close)/p_itvl)*p_itvl);

    q_min = 1;
    q_now = 1;

    $("input[name='"+"quant[1]"+"']").val(q_now).change();
    $("input[name='"+"price[1]"+"']").val(p_now).change();
}
recalc();

setInterval(function(){
    if (nextIsPressed){
        stat = getCurrentStatus ();
        p_now = stat.open;
        recalc();
    }
    nextIsPressed = 0;
}, 100);

function removeNonDigit (name, sname, lname, min, max, now, itvl){
    var input = $("input[name='"+name+"']");
    var i_now = parseInt(input.val());
    var i_now_p = Number(input.val());
    if (isNaN(i_now_p)) {
        input.val(now);
    }
    else if (i_now <= min){
        input.val(min).change();

        if (sname == "q") q_now = min;
        else p_now = min;

        if (min + itvl > max){
            $("#"+lname+"-plus").attr('disabled', true);
            $("#"+lname+"-plus").css("color","#9c9c9c");
        }
        else {
            $("#"+lname+"-plus").attr('disabled', false);
            $("#"+lname+"-plus").css("color","black");
        }
        $("#"+lname+"-minus").attr('disabled', true);
        $("#"+lname+"-minus").css("color","#9c9c9c");

        document.getElementById(""+sname+"_rng").innerHTML = "Minimum: " + min;

    }
    else if (i_now >= max){
        input.val(max).change();

        if (sname == "q") q_now = max;
        else p_now = max;

        if (max - itvl < min){
            $("#"+lname+"-minus").attr('disabled', true);
            $("#"+lname+"-minus").css("color","#9c9c9c");
        }
        else {
            $("#"+lname+"-minus").attr('disabled', false);
            $("#"+lname+"-minus").css("color","black");
        }
        $("#"+lname+"-plus").attr('disabled', true);
        $("#"+lname+"-plus").css("color","#9c9c9c");

        document.getElementById(""+sname+"_rng").innerHTML = "Maximum: " + max;
    }
    else {
        if (sname == "q")
            q_now = i_now;
        else
            p_now = i_now;
        input.val(i_now).change();
        document.getElementById(""+sname+"_rng").innerHTML = " ";

        $("#"+lname+"-plus").attr('disabled', false);
        $("#"+lname+"-plus").css("color","black");
        $("#"+lname+"-minus").attr('disabled', false);
        $("#"+lname+"-minus").css("color","black");
    }
}

setInterval(function() {
    removeNonDigit ("quant[1]", "q", "quantity", q_min, q_max, q_now, q_itvl);
    removeNonDigit ("price[1]", "p", "price", p_min, p_max, p_now, p_itvl);
}, 500);

setInterval(function() {
    document.getElementById("expected-sum").innerHTML = "=" + toIDR(q_now * p_now * 100);

    if (_side == "buy"){
        q_max = Math.floor(portfolio.v_balance/p_now);
        if (portfolio.v_balance < p_now){
            $("#"+_side).addClass ("disabled");
        }
        else {
            $("#"+_side).removeClass ("disabled");
        }
    }
    else {
        q_max = portfolio.c_stock;
        if (portfolio.c_stock < 1){
            $("#"+_side).addClass ("disabled");
        }
        else {
            $("#"+_side).removeClass ("disabled");
        }
    }
}, 100);

$('.quantity-counter').click(function(e, a){
    e.preventDefault();

    var input = $("input[name='"+"quant[1]"+"']");
    var i_now = parseInt(input.val());

    $(this).attr('disabled', false);

    if($(this).attr('data-type') == 'minus') {
        if(q_now - q_itvl >= q_min) {
            q_now = q_now - q_itvl;
            input.val(q_now).change();
        }
        if (q_now < q_max){
            $('#quantity-plus').attr('disabled', false);
            $('#quantity-plus').css("color","black");
        }
        if(q_now - q_itvl < q_min) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");

            document.getElementById("q_rng").innerHTML = "Maximum: " + q_min;
        }
    }
    else if($(this).attr('data-type') == 'plus') {
        if(q_now + q_itvl <= q_max) {
            q_now = q_now + q_itvl;
            input.val(q_now).change();
        }
        if (q_now > q_min){
            $('#quantity-minus').attr('disabled', false);
            $('#quantity-minus').css("color","black");
        }
        if(q_now + q_itvl > q_max) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");

            document.getElementById("q_rng").innerHTML = "Maximum: " + q_max;
        }
    }
});





$('.price-counter').click(function(e, a){
    e.preventDefault();

    var input = $("input[name='"+"price[1]"+"']");
    var i_now = parseInt(input.val());

    $(this).attr('disabled', false);

    if (!isNaN(i_now)) {
        input.val(p_now);
    }
    if($(this).attr('data-type') == 'minus') {
        if(p_now - p_itvl >= p_min) {
            p_now = p_now - p_itvl;
            input.val(p_now).change();
        }
        if (p_now < p_max){
            $('#price-plus').attr('disabled', false);
            $('#price-plus').css("color","black");
        }
        if(p_now - p_itvl <= p_min) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");
        }
    }
    else if($(this).attr('data-type') == 'plus') {
        if(p_now + p_itvl <= p_max) {
            p_now = p_now + p_itvl;
            input.val(p_now).change();
        }
        if (p_now > p_min){
            $('#price-minus').attr('disabled', false);
            $('#price-minus').css("color","black");
        }
        if(p_now + p_itvl >= p_max) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");
        }
    }
});
