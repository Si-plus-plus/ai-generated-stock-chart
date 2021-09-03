var portfolio = {
    i_balance: 100000000,
    v_balance: 0,
    gain: 0,

    v_stock: 0,
    c_stock: 0
}
portfolio.v_balance = portfolio.i_balance;

var current_bar = {
    open: 0,
	high: 0,
	low: 0,
	close: 0,
	time: 0
};
var current_price = 0;
var prev_price = 0;

var day;
var ticker;
console.log(current_bar);
var refresh_rate = 1000;
var interval_chg;
var transaction_count = 0;

function updateDay (){
    day += 1;
    document.getElementById("day").innerHTML = "Day "+(day)+" of 100";
}

function updateInterval (){
    price = current_bar.open;
    if (50 <= price && price <= 200) {
        interval_chg = 1;
    }
    else if (price <= 500) {
        interval_chg = 2;
    }
    else if (price <= 2000) {
        interval_chg = 5;
    }
    else if (price <= 5000) {
        interval_chg = 10;
    }
    else {
        interval_chg = 25;
    }
}

$("#bin").hide();
