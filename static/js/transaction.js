function EOD () {
    // console.log("EOD");
    var history = document.getElementById("orders-history");
    var history_length = history.rows.length;
    for (var r = 1; r < history_length; r++) {
        var cur_cells = history.rows.item(r).cells;
        if (cur_cells[6].innerHTML == "Pending"){
            cur_cells[6].innerHTML = "Unfulfilled";
        }
    }
    portfolio.on_hold_stock = portfolio.on_hold_balance = 0;
}
