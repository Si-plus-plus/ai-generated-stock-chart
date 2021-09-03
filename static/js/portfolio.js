function cal_avg(){
    if (portfolio.c_stock == 0) return 0;
    var temp = portfolio.v_stock/portfolio.c_stock;
    console.log(portfolio.v_stock + "/" + portfolio.c_stock +"=" + temp);
    return temp;
}

function cal_gain (){
    if (portfolio.i_balance == 0) return "0%";
    var x = ((portfolio.c_stock*100*current_price+portfolio.v_balance)-(portfolio.i_balance))/portfolio.i_balance;

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
        x = ((portfolio.c_stock*100*current_price+portfolio.v_balance)-(portfolio.i_balance));
    }
    else {
        x = 0;
    }
    return x;
}

setInterval(function() {
    document.getElementById("ib").innerHTML = toIDR(portfolio.i_balance);
    document.getElementById("vb").innerHTML = toIDR(portfolio.v_balance);
    document.getElementById("vpl").innerHTML = toIDR(floating_pl());
    document.getElementById("g").innerHTML = cal_gain();
    document.getElementById("cs").innerHTML = portfolio.c_stock + " Lots";
    document.getElementById("av").innerHTML = toIDR(portfolio.c_stock*100*current_price);
    document.getElementById("ap").innerHTML = toIDR(Math.round(cal_avg()));
}, refresh_rate);
