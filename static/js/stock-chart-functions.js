var candleSeries = chart.addCandlestickSeries();
var data = stockChartData_i;
var data_g = stockChartData_g;
candleSeries.setData(data);

prev_price = data[data.length - 1].close;
var lastIndex = data.length - 1;

var current_index = 0;

var today = new Date("2021-08-24");
var currentBusinessDay = { day: today.getMonth(), month: today.getDate(), year: today.getFullYear() };

current_bar = {
	open: data_g[current_index].open,
	high: data_g[current_index].open,
	low: data_g[current_index].open,
	close: data_g[current_index].open,
	time: currentBusinessDay
};

function mergeTickToBar(price) {
	price = Math.min (price, data_g[current_index].high);
	price = Math.max (price, data_g[current_index].low);

	current_bar.close = price;
	current_bar.high = Math.max(current_bar.high, price);
	current_bar.low = Math.min(current_bar.low, price);
	current_bar.day = currentBusinessDay;
	candleSeries.update(current_bar);

	current_price = price;
}

function nextBusinessDay(time) {
	var d = new Date();
	d.setUTCFullYear(time.year);
	d.setUTCMonth(time.month);
	d.setUTCDate(time.day + 1);
	d.setUTCHours(0, 0, 0, 0);
	return {
		year: d.getUTCFullYear(),
		month: d.getUTCMonth(),
		day: d.getUTCDate(),
	};
}

var canStillTick = 1;
function endGame (){
	// console.log("endgame")
	finishGame();
	canStillTick = 0;
}

var nextIsPressed = 0;
$("#next-day").click(function(){
	if (canStillTick == 1){
		nextIsPressed = 1;
		current_bar = {
			open: data_g[current_index].open,
			high: data_g[current_index].high,
			low: data_g[current_index].low,
			close: data_g[current_index].close,
			time: currentBusinessDay,
		};
		candleSeries.update(current_bar);

		currentBusinessDay = nextBusinessDay(currentBusinessDay);
		current_index++;

		if (current_index >= data_g.length-1){
			endGame();
		}
		else {
			prev_price = current_bar.close;
			current_bar = {
				open: data_g[current_index].open,
				high: data_g[current_index].open,
				low: data_g[current_index].open,
				close: data_g[current_index].open,
				time: currentBusinessDay,
			};
		}

		updateDay ();
		updateInterval ();
		recalc();
    	transaction_count = 0;
	}
});

function noisePrice (){
	var basePrice = 0;
	if (current_index == 0){
		basePrice = data[data.length-1].close;
	}
	else {
		basePrice = data_g[current_index-1].close;
	}
	var p_min = basePrice-(Math.floor((basePrice-data_g[current_index].low)/interval_chg)*interval_chg);
    var p_max = basePrice+(Math.floor((data_g[current_index].high-basePrice)/interval_chg)*interval_chg);

	var chg = Math.floor(randn_bm(Math.floor((p_min-current_bar.close)/interval_chg), Math.floor((p_max-current_bar.close)/interval_chg), 2));
	// console.log ("Bp"+ current_bar.close);
	// console.log (p_min);
	// console.log (Math.floor((p_min-current_bar.close)/interval_chg));
	// console.log (Math.floor((p_max-current_bar.close)/interval_chg));
	// console.log (chg);
	return current_bar.close + chg * interval_chg;
}

setInterval(function() {
	if (canStillTick == 1){
		mergeTickToBar(noisePrice());
	}
}, refresh_rate);


recalc();
updateInterval();
