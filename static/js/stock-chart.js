var chart = LightweightCharts.createChart(document.getElementById("stock-chart"), {
	timeScale: {
		visible: false
	},
	width: 700,
    height: 300,
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
});

function resize() {
    chart.applyOptions({
		width: $('#chart-container').width(),
		height: $('#chart-container').height()
	})
}

var candleSeries = chart.addCandlestickSeries();
var data = stockChartData_i;
var data_g = stockChartData_g;
candleSeries.setData(data);

var lastClose = data[data.length - 1].close;
var lastIndex = data.length - 1;

var currentIndex = 0;
var price_p;

var today = new Date("2021-08-24");
var currentBusinessDay = { day: today.getMonth(), month: today.getDate(), year: today.getFullYear() };

var currentBar = {
	open: data_g[currentIndex].open,
	high: data_g[currentIndex].open,
	low: data_g[currentIndex].open,
	close: data_g[currentIndex].open,
	time: currentBusinessDay,
};

function getDay (){
	return currentIndex+1;
}

function getCurrentStatus (){
	var stat = {
		last_close: currentBar.lastClose,

		open: currentBar.open,
		close: currentBar.close,
		high: currentBar.high,
		low: currentBar.open,
		cur: price_p
	}
	return stat;
}

function mergeTickToBar(price) {
	price = Math.min (price, data_g[currentIndex].high);
	price = Math.max (price, data_g[currentIndex].low);

	currentBar.close = price;
	currentBar.high = Math.max(currentBar.high, price);
	currentBar.low = Math.min(currentBar.low, price);
	currentBar.time = currentBusinessDay;
	candleSeries.update(currentBar);
	price_p = price;
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
		currentBar = {
			open: data_g[currentIndex].open,
			high: data_g[currentIndex].high,
			low: data_g[currentIndex].low,
			close: data_g[currentIndex].close,
			time: currentBusinessDay,
		};
		candleSeries.update(currentBar);

		currentBusinessDay = nextBusinessDay(currentBusinessDay);
		currentIndex++;
		// console.log(data_g.length + " : " + currentIndex);
		// console.log("O" + data_g[currentIndex].open);
		// console.log("D" + data_g[currentIndex].time);
		if (currentIndex >= data_g.length-1){
			endGame();
		}
		else {
			currentBar = {
				open: data_g[currentIndex].open,
				high: data_g[currentIndex].open,
				low: data_g[currentIndex].open,
				close: data_g[currentIndex].open,
				time: currentBusinessDay,
			};
		}
		document.getElementById("day").innerHTML = "Day "+getDay()+" of 85";
	}
});

function noisePrice (){
	var basePrice = 0;
	if (currentIndex == 0){
		basePrice = data[data.length-1].close;
	}
	else {
		basePrice = data_g[currentIndex-1].close;
	}
	var p_itvl = interval(basePrice);
	var p_min = basePrice-(Math.floor((basePrice-data_g[currentIndex].low)/p_itvl)*p_itvl);
    var p_max = basePrice+(Math.floor((data_g[currentIndex].high-basePrice)/p_itvl)*p_itvl);

	var chg = Math.floor(randn_bm(Math.floor((p_min-currentBar.close)/p_itvl), Math.floor((p_max-currentBar.close)/p_itvl), 2));
	// console.log ("Bp"+ currentBar.close);
	// console.log (p_min);
	// console.log (Math.floor((p_min-currentBar.close)/p_itvl));
	// console.log (Math.floor((p_max-currentBar.close)/p_itvl));
	// console.log (chg);
	return currentBar.close + chg * p_itvl;
}

setInterval(function() {
	if (canStillTick == 1){
		mergeTickToBar(noisePrice());
	}
	resize();
}, 1000);
