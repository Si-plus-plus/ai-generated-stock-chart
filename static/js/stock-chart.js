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

setInterval(function() {
    chart.applyOptions({
		width: $('#chart-container').width(),
		height: $('#chart-container').height()
	})
}, 300);
