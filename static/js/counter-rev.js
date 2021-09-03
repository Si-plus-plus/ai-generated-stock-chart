var t_quant = {
    lo : 1,
    hi : 0,
    now : 1
};

var t_price = {
    lo : 0,
    hi : 0,
    now : current_bar.open
};

function recalc(){
    t_price.now = current_bar.open;
    t_price.lo = prev_price-(Math.floor((prev_price-Math.ceil(prev_price*0.93))/interval_chg)*interval_chg);
    t_price.hi = prev_price+(Math.floor((Math.floor(prev_price*1.25)-prev_price)/interval_chg)*interval_chg);

    t_quant.now = 1;

    $("input[name='"+"quant[1]"+"']").val(t_quant.now).change();
    $("input[name='"+"price[1]"+"']").val(t_price.now).change();
}
recalc();
updateInterval();

function removeNonDigit (name, sname, lname, min, max, now, itvl){
    var input = $("input[name='"+name+"']");
    var i_now = parseInt(input.val());
    var i_now_p = Number(input.val());
    if (isNaN(i_now_p)) {
        input.val(now);
    }
    else if (i_now <= min){
        input.val(min).change();

        if (sname == "q") t_quant.now = min;
        else t_price.now = min;

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

        if (sname == "q") t_quant.now = max;
        else t_price.now = max;

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
            t_quant.now = i_now;
        else
            t_price.now = i_now;
        input.val(i_now).change();
        document.getElementById(""+sname+"_rng").innerHTML = " ";

        $("#"+lname+"-plus").attr('disabled', false);
        $("#"+lname+"-plus").css("color","black");
        $("#"+lname+"-minus").attr('disabled', false);
        $("#"+lname+"-minus").css("color","black");
    }
}

// setInterval(function() {
//
//
// }, 100);


setInterval(function() {
    document.getElementById("expected-sum").innerHTML = "=" + toIDR(t_quant.now * t_price.now * 100);

    if (_side == "buy"){
        t_quant.hi = Math.floor(portfolio.v_balance/(t_price.now*100));
        if (portfolio.v_balance < t_price.now*100){
            $("#"+_side).addClass ("disabled");
        }
        else {
            $("#"+_side).removeClass ("disabled");
        }
    }
    else {
        t_quant.hi = portfolio.c_stock;
        if (portfolio.c_stock < 1){
            $("#"+_side).addClass ("disabled");
        }
        else {
            $("#"+_side).removeClass ("disabled");
        }
    }
}, 100);

$("#q_field").focus(function(){
    $("#"+_side).addClass ("disabled");
});

$("#q_field").blur(function(){
    removeNonDigit ("quant[1]", "q", "quantity", t_quant.lo, t_quant.hi, t_quant.now, 1);
    $("#"+_side).removeClass ("disabled");
});

$("#p_field").focus(function(){
    $("#"+_side).addClass ("disabled");
});

$("#p_field").blur(function(){
    $("#"+_side).removeClass ("disabled");
    removeNonDigit ("price[1]", "p", "price", t_price.lo, t_price.hi, t_price.now, interval_chg);
});


$('.quantity-counter').click(function(e, a){
    console.log("q");
    e.preventDefault();

    var input = $("input[name='"+"quant[1]"+"']");
    var i_now = parseInt(input.val());

    $(this).attr('disabled', false);

    if($(this).attr('data-type') == 'minus') {
        if(t_quant.now - 1 >= t_quant.lo) {
            t_quant.now = t_quant.now - 1;
            input.val(t_quant.now).change();
        }
        if (t_quant.now < t_quant.hi){
            $('#quantity-plus').attr('disabled', false);
            $('#quantity-plus').css("color","black");
        }
        if(t_quant.now - 1 < t_quant.lo) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");

            document.getElementById("q_rng").innerHTML = "Maximum: " + t_quant.lo;
        }
    }
    else if($(this).attr('data-type') == 'plus') {
        if(t_quant.now + 1 <= t_quant.hi) {
            t_quant.now = t_quant.now + 1;
            input.val(t_quant.now).change();
        }
        if (t_quant.now > t_quant.lo){
            $('#quantity-minus').attr('disabled', false);
            $('#quantity-minus').css("color","black");
        }
        if(t_quant.now + 1 > t_quant.hi) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");

            document.getElementById("q_rng").innerHTML = "Maximum: " + t_quant.hi;
        }
    }
});

$('.price-counter').click(function(e, a){
    e.preventDefault();

    var input = $("input[name='"+"price[1]"+"']");
    var i_now = parseInt(input.val());

    $(this).attr('disabled', false);

    if (!isNaN(i_now)) {
        input.val(t_price.now);
    }
    if($(this).attr('data-type') == 'minus') {
        console.log(t_price.now);
        if(t_price.now - interval_chg >= t_price.lo) {
            t_price.now = t_price.now - interval_chg;
            input.val(t_price.now).change();
        }
        if (t_price.now < t_price.hi){
            $('#price-plus').attr('disabled', false);
            $('#price-plus').css("color","black");
        }
        if(t_price.now - interval_chg <= t_price.lo) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");
        }
    }
    else if($(this).attr('data-type') == 'plus') {
        if(t_price.now + interval_chg <= t_price.hi) {
            t_price.now = t_price.now + interval_chg;
            input.val(t_price.now).change();
        }
        if (t_price.now > t_price.lo){
            $('#price-minus').attr('disabled', false);
            $('#price-minus').css("color","black");
        }
        if(t_price.now + interval_chg >= t_price.hi) {
            $(this).attr('disabled', true);
            $(this).css("color","#9c9c9c");
        }
    }
});
