var portfolio = {
    i_balance: 10000000,
    v_balance: 10000000,
    gain: 0,

    v_stock: 0,
    c_stock: 0
}

function price_now (){
    var stat = getCurrentStatus ();
    return stat.cur;
}

function calAvg(){
    if (portfolio.c_stock == 0) return 0;
    var temp = portfolio.v_stock/portfolio.c_stock;
    return temp;
}

function calGain (){
    var x = ((portfolio.c_stock*price_now()+portfolio.v_balance)-(portfolio.i_balance))*100/portfolio.i_balance;

    if (Math.abs(x) < 1e-3) return "0.00%";
    if (x < 0){
        return x.toFixed(2)+"%";
    }
    else {
        return "+"+x.toFixed(2)+"%";
    }
}

function floating_pl(){
    var x;

    if(portfolio.c_stock > 0){
        x = ((portfolio.c_stock*price_now()+portfolio.v_balance)-(portfolio.i_balance))*100;
    }
    else {
        x = 0;
    }
    return x;
}

setInterval(function() {
    document.getElementById("ib").innerHTML = toIDR(portfolio.i_balance*100);
    document.getElementById("vb").innerHTML = toIDR(portfolio.v_balance*100);
    document.getElementById("vpl").innerHTML = toIDR(floating_pl());
    document.getElementById("g").innerHTML = calGain();
    document.getElementById("cs").innerHTML = portfolio.c_stock + " Lots";
    document.getElementById("av").innerHTML = toIDR(portfolio.c_stock*100*price_now());
    document.getElementById("ap").innerHTML = toIDR(Math.round(calAvg()));
}, 100);
