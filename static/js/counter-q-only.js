var stat = getCurrentStatus ();

var q_min = 1;
var q_max = 10;
var q_now = 1;
var q_itvl = 1;

var p_now = stat.open;

function recalc(){
    p_now = stat.open;
    q_min = 1;

    $("input[name='"+"quant[1]"+"']").val(q_now).change();
}
recalc();


function getPrice (){
    return p_now;
}

function getLots (){
    return q_now;
}

setInterval(function(){
    if (canStillTick == 1){
        if (nextIsPressed){
            stat = getCurrentStatus ();
            recalc();
        }
        nextIsPressed = 0;

    }
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
    if (canStillTick){
        stat = getCurrentStatus ();
        p_now = stat.cur;
        removeNonDigit ("quant[1]", "q", "quantity", q_min, q_max, q_now, q_itvl);
        document.getElementById("current_price").innerHTML = toIDR(p_now);
    }
}, 500);

setInterval(function() {
    if (canStillTick == 1){
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
